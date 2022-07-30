from django.contrib.auth import login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render, redirect


def signup_view(request):
    error = ""
    if request.method == 'POST':
        print(request.POST)
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("messenger_app:index")
        else:
            error = form.errors
            print(error)
    else:
        form = UserCreationForm()
    return render(request, "../templates/users/sign_up.html", {
        "form": form,
        "errormsg": error
    })


def signin_view(request):
    error = ""
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, user=form.get_user())
            return redirect("messenger_app:index")
    else:
        form = AuthenticationForm()
    return render(request, "../templates/users/sign_in.html", {
        "form": form,
        "errormsg": error
    })


def logout_view(request):
    logout(request)
    return redirect('messenger_app:index')
