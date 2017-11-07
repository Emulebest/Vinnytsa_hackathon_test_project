import base64

from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import json


class SearchRepos(APIView):
    def get(self, request):
        repo = request.GET.get("q", None)
        owner = request.GET.get("owner", None)
        auth = ('marakaci', 'Nikita12')
        if repo and owner:
            base_url = f'https://api.github.com/repos/{str(owner)}/{str(repo)}'
            try:
                label_count = {}
                issues = self._get_all_items(f'{base_url}/issues',auth=auth)
                # labels = self._get_all_items(f'{base_url}/labels', auth=auth)

            except Http404:
                return Response({
                    "error": "Not found"
                }, status=status.HTTP_404_NOT_FOUND)
            class Label(dict):
                def __init__(self,name,children=None,issues=None):
                    super().__init__()
                    self.__dict__ = self
                    self.name = name
                    self.children = children if children else []
                    self.issues = issues if issues else []
                def add_child(self,child):
                    self.children.append(child)
                def set_issues(self,issues):
                    self.issues = issues
                def __eq__(self, other):
                    return self.name == other.name
                def __str__(self):
                    return self.name
            no_label = Label(name='no_label',issues =[issue for issue in issues if not issue['labels']])
            for issue in issues:
                for label in issue['labels']:
                    if not label['name'] in label_count:
                        label_count[label['name']] = 1
                    else:
                        label_count[label['name']] += 1
            labels_issues = Label(name='with_label')
            for issue in issues:
                issue_labels = [label['name'] for label in issue['labels']]
                issue_labels = list(sorted(issue_labels, key=lambda x: -label_count[x]))
                label_issue_child = labels_issues
                for ind,issue_label in enumerate(issue_labels):
                    _label = Label(issue_label)
                    if not _label in label_issue_child.children:
                        label_issue_child.add_child(_label)
                        label_issue_child = _label
                        _label.issues = self._get_issues_by_label(issue_labels[:ind+1],issues)
                    else:
                        for l in label_issue_child.children:
                            if l == _label:
                                label_issue_child = l
            labels_issues.add_child(no_label)
            return Response({
                "labels_with_issues":labels_issues.children
            })
        else:
            return Response({
                "error": "Not found"
            }, status=status.HTTP_404_NOT_FOUND)

    def _get_all_items(self, url, auth):
        res = requests.get(url+'?per_page=100', auth=auth)
        items = {}
        if res.status_code == 200:
            items = json.loads(res.content)
            while True:
                try:
                    next = res.headers['Link'].split(',')[0].split(';')
                    next = next[1][6:10]
                    if next != 'next':
                        return items
                    next_url = res.headers['Link'].split(',')[0].split(';')[0][1:-1]
                    res = requests.get(next_url, auth=auth)
                    items += json.loads(res.content)
                except:
                    return items
        else:
            raise items

    def _get_issues_by_label(self,labels,issues):
        i = []
        for issue in issues:
            if all([label['name'] in labels for label in issue['labels']]):
                i.append(issue)
        return i