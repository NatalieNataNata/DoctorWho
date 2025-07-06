from django.db import models

# Create your models here.
# users/models.py
from django.db import models
from django.utils import timezone

class Users(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=150)
    role_id = models.IntegerField(default=2)  # 角色id 0=超级管理员, 1=高级用户, 2=普通用户
    date_joined = models.DateTimeField(default=timezone.now)
    reset_token = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return (f"Users(email={self.email}, username={self.username}, password={self.password}, "
                f"role_id={self.role_id}, date_joined={self.date_joined}, reset_token={self.reset_token})")
    # 这里定义了打印时显示的内容
    # 在 Django 模型里，当你打印一个模型实例，比如 print(user)，它其实调用的是模型的 __str__() 方法
