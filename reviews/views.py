from rest_framework.views import APIView


class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
