from itertools import groupby

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import json




class SearchRepos(APIView):
    def get(self, request):
        search_criteria = request.GET.get("q", None)
        owner = request.GET.get("owner", None)
        if search_criteria and owner:
            base_url = f'https://api.github.com/repos/{str(owner)}/{str(search_criteria)}'
            issues = requests.get(f'{base_url}/issues')
            if issues.status_code == 200:
                labels = requests.get(f'{base_url}/labels')
                labels = json.loads(labels.content)
                label_count = {}
                for label in labels:
                    label_count[label['name']] = len(requests.get(f'{base_url}/issues?labels={label["name"]}').content)
                issues = json.loads(issues.content)
                labels_dict ={}
                for issue in issues:
                    issue_labels = [label.name for label in issue.label]
                    issue_labels = list(sorted(issue_labels,key=lambda x: -label_count[x]))
                    issue_dict = labels_dict
                    for issue_label in issue_labels:
                        if issue_dict == 'self':
                            issue_dict = {}
                        if not issue_label in issue_dict:
                            issue_label[issue_label] = 'self'
                        issue_dict = issue_dict[issue_label]
                return Response({
                    "issues":json.loads(issues.content),
                    "labels": labels_dict
                })
            else:
                return Response({
                    "error": "Not found"
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                "error": "Not found"
            }, status=status.HTTP_404_NOT_FOUND)
