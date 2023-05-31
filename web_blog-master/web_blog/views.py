from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.shortcuts import render,redirect
import database

url = 'http://localhost:8080/'

@csrf_exempt
def index(request):
	for this_session in request.session.keys(): #If session exists yet
		return redirect('/?profile='+this_session)
	auth = False #If session doesn't exist yet
	if request.path == "/auth/":
		auth = True
	return HttpResponse(render(
			request,
			'index.html',
			{
				'auth':auth,
			}
		))

@csrf_exempt
def profile(request):
	for this_session in request.session.keys():
		user = False
		if request.path == "/":
			user = True
		return HttpResponse(render(
				request,
				'index.html',
				{
					'user':user,
				}
			))
	return redirect('/auth')

@csrf_exempt
def subs(request):
	for this_session in request.session.keys():
		subs = False
		if request.path == "/subscriptions/" or request.path == "/subscribers/":
			subs = True
		return HttpResponse(render(
				request,
				'index.html',
				{
					'subs':subs,
				}
			))
	return redirect('/auth')

@csrf_exempt
def auth(request):
	body = json.loads(request.body)
	if body["type"] == "isLog":
		for this_session in request.session.keys(): #If session exists yet
			return HttpResponse(json.dumps({"isLog": True}))#Return true if session exists
		return HttpResponse(json.dumps({"isLog": False}))#Return false if session doesn't exist
	elif body["type"] == "login":
		if database.check_user(body["login"],body["password"]) == True: #Checking if login and password correct
			request.session[body["login"]] = body["password"] #Start new session	
			return HttpResponse(json.dumps({"redirect_url": url+"?profile="+body["login"]}))#Return redirection link to profile page after success login
		else:
			return HttpResponse(json.dumps({'error':'Incorrect login or password'})) #Error if login or password incorrect
	elif body["type"] == "logout":
		for this_session in request.session.keys(): #Get session name
			del request.session[this_session] #Delete session with this name
			break #Stop loop
		return HttpResponse(json.dumps({"redirect_url": url+"auth"})) #Return redirection link to auth
	elif body["type"] == "registration":
		if database.check_login(body["login"]) == True: #Checking login uniqueness 
			return HttpResponse(json.dumps({'error':'User already exist'})) #Error if this login exist yet
		database.add_user(body["name"],body["login"],body["password"]) #Create new user
		request.session[body["login"]] = body["password"] #Start new session
		return HttpResponse(json.dumps({"redirect_url": url+"?profile="+body["login"]}))#Return redirection link to profile page after registration
		
@csrf_exempt
def user_page(request):
	body = json.loads(request.body)
	if body["type"] == "getUser":
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		info = database.get_user(user) #Get user info
		return HttpResponse(json.dumps(info)) #Return user info
	elif body["type"] == "addPost":
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		database.add_post(body["text"],user)
		return HttpResponse(json.dumps({"res": "ok"})) #Return result
	elif body["type"] == "mySubs":
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		return HttpResponse(json.dumps({"redirect_url": url+"subscriptions?profile="+user})) #Return redirect
	elif body["type"] == "subsOnMe":
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		return HttpResponse(json.dumps({"redirect_url": url+"subscribers?profile="+user})) #Return redirect
	elif body["type"] == "checkPage":
		isUser = False
		isSub = False
		for session in request.session.keys():
			user = body["link"][body["link"].find("=")+1:] #Get user login from link
			if user == session:
				isUser = True
			subscriptions = database.get_subscriptions(session)
			for i in subscriptions:
				if user == i[0]:
					isSub = True
		return HttpResponse(json.dumps({"isUser": isUser,"isSub": isSub})) #Return redirect
	elif body["type"] == "unSub":
		for session in request.session.keys():
			sub = body["link"][body["link"].find("=")+1:] #Get user login from link
			database.delete_subscriptions(session,sub)
		return HttpResponse(json.dumps({"res":"ok"})) #Return result
	elif body["type"] == "addSub":
		for session in request.session.keys():
			sub = body["link"][body["link"].find("=")+1:] #Get user login from link
			database.add_subscriptions(session,sub)
		return HttpResponse(json.dumps({"res":"ok"}))
	

@csrf_exempt
def subs_page(request):
	body = json.loads(request.body)
	if body["type"] == "mySubs":
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		subs = database.get_subscriptions(user)
		return HttpResponse(json.dumps({"subs":subs})) #Return result
	elif body["type"] == "subsOnMe":
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		subs = database.get_subscribers(user)
		return HttpResponse(json.dumps({"subs":subs})) #Return result
	elif body["type"] == "unSub":
		# print(body)
		user = body["link"][body["link"].find("=")+1:] #Get user login from link
		database.delete_subscriptions(user,body["subs"])
		return HttpResponse(json.dumps({"res":"ok"})) #Return result