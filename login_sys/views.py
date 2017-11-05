import requests
from rest_framework.response import Response
from rest_framework.views import APIView


class LoginGit(APIView):
    def post(self, request):
        r = requests.get('https://api.github.com/user', auth=(request.data["username"], request.data["password"]))
        return Response({
            "user_info": r.json()
        }, status=r.status_code)
