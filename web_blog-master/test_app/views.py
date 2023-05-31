from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json

@csrf_exempt
def index(request):
	with open('test_app/templates/test.html', 'r') as file:
		return HttpResponse(file.read())

@csrf_exempt
def script(request):
	with open('test_app/templates/test.js', 'r') as file:
		return HttpResponse(file.read(), content_type="text/javascript")

@csrf_exempt
def client_server(request):
	body = json.loads(request.body)
	#print(body)
	#ses = request.session['mini']

	#request.session['user'] = 'password' #Create a new session, if key user doesn't exist, KeyError will arise 

	ses = request.session.get('user') #Get a value of sessin with key user
	print(ses)

	#del request.session['user'] #Delete a value of sessin with key user

	return HttpResponse("ok")