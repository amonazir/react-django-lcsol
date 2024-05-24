from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import StringSerializer
import requests
from bs4 import BeautifulSoup

def getSol(problem, lang):

    q = problem
    url = f'https://walkccc.me/LeetCode/problems/{q:04}'

    try:
        req = requests.get(url)
    except:
        return ["Couldn't connect to network!", "Network Unavailable"]


    if req.status_code == 404:
         return ["Question Number Incorrect", "Uvailable"]

    soup = BeautifulSoup(req.content, "html.parser")
    problem = soup.title.string[:-21]

    if lang == 'C++':
        j = 0
    elif lang == 'Python':
        j = 2
    else:
        j = 1

    return [soup.find_all("code")[j].get_text(), problem]

@api_view(['POST'])
def modify_string(request):
    serializer = StringSerializer(data=request.data)
    if serializer.is_valid():
        string1 = serializer.validated_data.get('input_string', '')  # Assuming 'string1' is the key for the first string
        string2 = serializer.validated_data.get('input_lang', '')  # Assuming 'string2' is the key for the second string
        answer_code = getSol(int(string1), string2)[0]
        problem = getSol(int(string1), string2)[1]
        return Response({'answer_code': answer_code, 'problem' : problem})
    return Response(serializer.errors, status=400)

