from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from .models import Product,Tickets
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from django.forms.models import model_to_dict



@csrf_exempt
def welcome(request):
    
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        count_users = User.objects.all().count()
        count_product = Product.objects.all().count()
        latest_tickets = {'latest_tik': list(Tickets.objects.values())}


        if user is not None:
            user_data = {
                  
                    'username': user.username,
                    'email': user.email,  
                  
            }

            stats = {
                    'count_users': count_users,
                    'count_product': count_product

            }

            latest_tik = {
                'latest_tik': latest_tickets
            }
            print(latest_tickets)
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Login successful','user': user_data, 'stats': stats, 'latest_tik': latest_tik})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid username or password'}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed','user': user}, status=405)

@csrf_exempt
def all_tickets(request):

    if request.method == 'POST':
        latest_tickets = {'latest_tik': list(Tickets.objects.values())}

        inprogress = Tickets.objects.filter(status='in_progress')
        inp = list(inprogress.values())
     

        completed  = Tickets.objects.filter(status = 'completed')
        com = list(completed.values())


        count_users = User.objects.all().count()
        count_product = Product.objects.all().count()
        latest_tickets = {'latest_tik': list(Tickets.objects.values())}


        stats = {
                    'count_users': count_users,
                    'count_product': count_product

        }

        latest_tik = {
                'latest_tik': latest_tickets
        }

        inprogress = {
            'inprogress': inp
        }

        completed = {
            'completed': com
        }
        latest_tik = {
                'latest_tik': latest_tickets
        }
        return JsonResponse({'success': True, 'message': 'items fetched  successful', 'latest_tik': latest_tik, 'inprogress': inprogress,'completed': completed, 'stats': stats,}, status=200) 

    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def delete_ticket(request, id):
    if request.method == 'POST':
        
        to = Tickets.objects.get(id=id)
        to.delete()
        return JsonResponse({'success': True, 'message': 'items deleted  successful'}, status=200) 

    else:
          return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)


@csrf_exempt
def view_ticket(request, id):
        if request.method == 'POST':

            recordinfo = Tickets.objects.get(id=id)
            record_dict = model_to_dict(recordinfo)
            print(record_dict)
        
            return JsonResponse({'success': True, 'message': 'items deleted  successful', 'record_json': record_dict}, status=200)

        else:
          return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)



@csrf_exempt
def create_ticket(request):
    if request.method == 'POST':

            data = json.loads(request.body)
            # Process the data
            name = data.get('name')
            description = data.get('description')
            status = data.get('status')

            ticket = Tickets.objects.create(name=name, description=description, status=status)
            return JsonResponse({'success': True, 'message': 'items saved  successful'}, status=200)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def edit_ticket(request, id): 

    if request.method == 'POST':
        data = json.loads(request.body)

        ticket = Tickets.objects.get(id = id)

        # Process the data
        ticket.name = data.get('name')
        ticket.description = data.get('description')
        ticket.status = data.get('status')

        ticket.save()

        return JsonResponse({'success': True, 'message': 'items edited  successful'}, status=200)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)


