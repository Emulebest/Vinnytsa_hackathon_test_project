from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests


class SearchRepos(APIView):
    def get(self, request):
        search_criteria = request.GET.get("q", None)
        print(search_criteria)
        owner = request.GET.get("owner", None)
        print(owner)
        if search_criteria and owner:
            repo = requests.get('https://api.github.com/repos/' + str(owner) + "/" + str(search_criteria))
            error_msg = repo.json().get("message", None)
            if error_msg and error_msg == "Not Found":
                return Response({
                    "error": "Not found"
                }, status=status.HTTP_404_NOT_FOUND)
            elif error_msg:
                return Response({
                    "error": "limit exceeded"
                })
            else:
                issues_url = repo.json()["issues_url"].split("{")[0]
                return Response({
                    "issues": requests.get(issues_url).json()
                })
        else:
            return Response({
                "error": "Not found"
            }, status=status.HTTP_404_NOT_FOUND)
