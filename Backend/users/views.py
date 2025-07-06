from django.shortcuts import render

# Create your views here.
# users/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from .models import Users


@api_view(['POST'])
def login(request):
    # print('11111111111111',request.method)  11111111111111 POST
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        # print(username) admin
        password = data.get('password')
        # print(password) # 123456
        try:
            user = Users.objects.get(username=username)
            # print(user) # @example.com是因为Users 模型的 __str__() 方法被重写了，而且它返回的是用户的邮箱（email）字段。
            # print(password)
            if user.password == password:
                # 登录成功
                return JsonResponse({'status': 'success',
                                     'message': '登录成功',
                                     'user': {
                                        'username': user.username,
                                        'role_id': user.role_id
                                        }
                                    })
            else:
                # 密码错误
                return JsonResponse({'status': 'fail', 'message': '密码错误'}, status=401)
        except Users.DoesNotExist:
            return JsonResponse({'status': 'fail', 'message': '用户不存在'}, status=404)

    return JsonResponse({'status': 'fail', 'message': '仅支持POST方法'}, status=405)
