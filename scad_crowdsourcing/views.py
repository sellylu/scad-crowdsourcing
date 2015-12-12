from django.shortcuts import render
from django.http import HttpResponse

from .models import Question
from .models import Answer

def index(request):
	return render(request, 'index.html')

def ask(request):
	return render(request, 'ask.html')

def listResult(request):
	return render(request, 'listRequest.html')

def result(request):
	return render(request, 'result.html')
'''



def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

'''