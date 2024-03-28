from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from .models import Product, Ticket
from django.forms.models import model_to_dict

@csrf_exempt
def welcome(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            user_data = {
                'username': user.username,
                'email': user.email,
            }
            count_users = User.objects.all().count()
            count_products = Product.objects.all().count()
            latest_tickets = list(Ticket.objects.values())
            stats = {
                'count_users': count_users,
                'count_products': count_products
            }
            return JsonResponse({'success': True, 'message': 'Login successful', 'user': user_data, 'stats': stats, 'latest_tickets': latest_tickets})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid username or password'}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def all_tickets(request):
    if request.method == 'POST':
        latest_tickets = list(Ticket.objects.values())
        in_progress_tickets = list(Ticket.objects.filter(status='in_progress').values())
        completed_tickets = list(Ticket.objects.filter(status='completed').values())
        count_users = User.objects.all().count()
        count_products = Product.objects.all().count()
        stats = {
            'count_users': count_users,
            'count_products': count_products
        }
        return JsonResponse({'success': True, 'message': 'Items fetched successfully', 'latest_tickets': latest_tickets, 'in_progress_tickets': in_progress_tickets, 'completed_tickets': completed_tickets, 'stats': stats}, status=200)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def delete_ticket(request, id):
    if request.method == 'POST':
        try:
            ticket = Ticket.objects.get(id=id)
            ticket.delete()
            return JsonResponse({'success': True, 'message': 'Ticket deleted successfully'}, status=200)
        except Ticket.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Ticket not found'}, status=404)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def view_ticket(request, id):
    if request.method == 'POST':
        try:
            ticket = Ticket.objects.get(id=id)
            ticket_dict = model_to_dict(ticket)
            return JsonResponse({'success': True, 'message': 'Ticket retrieved successfully', 'ticket': ticket_dict}, status=200)
        except Ticket.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Ticket not found'}, status=404)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def create_ticket(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            description = data.get('description')
            status = data.get('status')
            ticket = Ticket.objects.create(name=name, description=description, status=status)
            return JsonResponse({'success': True, 'message': 'Ticket saved successfully', 'ticket_id': ticket.id}, status=201)
        except Exception as e:
            return JsonResponse({'success': False, 'message': 'Error saving ticket: {}'.format(str(e))}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def edit_ticket(request, id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ticket = Ticket.objects.get(id=id)
            ticket.name = data.get('name', ticket.name)
            ticket.description = data.get('description', ticket.description)
            ticket.status = data.get('status', ticket.status)
            ticket.save()
            return JsonResponse({'success': True, 'message': 'Ticket edited successfully'}, status=200)
        except Ticket.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Ticket not found'}, status=404)
        except Exception as e:
            return JsonResponse({'success': False, 'message': 'Error editing ticket: {}'.format(str(e))}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)
