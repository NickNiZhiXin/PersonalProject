# -*- coding: utf-8 -*-
'''
#求阶乘n!
def factorial(num):
    result = 1
    for n in range(1,num+1):
        result*=n
    return result
#test code
n=int(input('n= '))
print (factorial(n))

#英寸与厘米互换
def inch_cm(length,unit):
    if unit == "in" or unit == "英寸":
        print('%f英寸=%f厘米' %(length, length*2.54))
    elif unit == "cm" or unit == "厘米":
        print('%.2f厘米=%.2f英寸' %(length, length/2.54))
    else:
        print('请输入有效的单位')
#test code:输入单位时需要加引号(Python版本2)
length = float(input('请输入长度 '))
unit = str(input('请输入单位 '))
inch_cm(length,unit)


#分数转换成等级
def score_grade(score):
    if score >= 90:
        grade = 'A'
    elif score >=80:
        grade = 'B'
    elif score >=70:
        grade = 'C'
    elif score >=60:
        grade = 'D'
    else:
        grade = 'E'
    print ('你的成绩为：', grade)
#test code
score = float(input('输入你的分数'))
score_grade(score)

#猜数字游戏
import random
def guess_number():
    answer = random.randint(1, 100)
    counter = 0
    while True:
        guess = int(input('请在1-99内猜一个整数'))
        counter +=1
        if guess > answer:
            print ('太大了')
        elif guess < answer:
            print ('太小了')
        else:
            print ('猜对了，共猜了%d次' %counter)
            break
    if counter >7:
        print ('你的智商堪忧啊')
#test code
guess_number()

#九九乘法表
def multiply99(number):
    for i in range(1,number+1):
        for j in range(1,i+1):
            print ('%dx%d=%d' %(i,j,i*j), end='\t')
        print()
#test code
multiply99(9)

#判断质数
import math
def prime(number):
    x=int(math.sqrt(number))
    is_prime = True
    for i in range(2,x):
        if number%i ==0:
            is_prime = False
            break
    if is_prime and number!=1:
        print ('%d是素数' % number)
    else:
        print ('%d不是素数' % number)
#test code
number=int(input('输入一个正整数：'))
prime(number)

#求两个数的最大公约数和最小公倍数
def divisor_multiple(x,y):
    if x > y:
        x,y = y,x
    for factor in range(x,0,-1):
        if x % factor == 0 and y % factor == 0:
            print ('%d和%d的最大公约数是%d' % (x,y,factor))
            print ('%d和%d的最小公倍数是%d' % (x,y,(x*y)//factor))
            break
x= int(input('第一个正整数'))
y= int(input('第二个正整数'))
divisor_multiple(x,y)

#打印图形
def stars(row):
    for i in range(row+1):
        for j in range(i):
            print ('*',end='')
        print()
    for i in range(row):
        for j in range(row-i):
            print (' ', end='')
        for j in range(i+1):
            print ('*', end='')
        print()
    for i in range(row):
        for j in range(row-i):
          print (' ',end='')
        for j in range(2*i+1):
          print ('*', end='')
        print()
row=int(input('要几行：'))
stars(row)


#多个数相加
def add(*args):
    total = 0
    for i in args:
        total+=i
    return total
print (add(5,6,7,8,9))

#创建反序正整数
def revert_integer(num):
    temp=0
    while num >0:
        temp = temp * 10 + num%10
        num=num//10
    return temp
num = int(input('请输入一个正整数'))
temp = revert_integer(num)
print('%d的反序数是%d' %(num,temp))

#反序字符串
def revert_string(str1):
    print (str1[::-1])
str1=str(input('请输入字符串'))
revert_string(str1)

#打印字符串
a,b=5,10
print(f'{a} * {b} = {a*b}')

#遍历一个列表的值和对应的索引
list1=['a','b','c','d','e']
for x, y in enumerate(list1):
    print(x,y)
print(list1)

#判断是不是闰年
def leap_year(year):
    if year%400 == 0 or (year%4 ==0 and year%100!=0):
        print ('%d年是闰年' %year)
    else:
        print ('%d年不是闰年' %year)
year = int(input('请输入年份'))
leap_year(year)

#水仙数
def narcissus():
    for num in range(100,1000):
        low = num%10
        middle = (num//10)%10
        high = num//100
        if num == low**3+middle**3+high**3:
            print (num)
narcissus()

#全局变量
def foo():
    global a
    a=200
    print(a)
if __name__ == '__main__':
    a = 100
    foo()
    print(a)


#字符串和常用结构
s1 = 'hello, world!\''
s2 = "\n\\hello, world"
print(s1, s2)

#字符串结构
str1='abc123456'
print(str1[::-1])
print(str1[::2])
print(str1[1:2])
str2='hello,world!'
print(len(str2))
print(str2.capitalize())
print(str2.title())
print(str1.endswith('hel'))
a,b=5,10
print('{0} * {1} = {2}'.format(a,b,a*b))
print('%d * %d = %d' %(a,b,a*b))
print(f'{a} * {b} = {a*b}')

#列表
list1 = [1,3,5,7,100]
for i in range(len(list1)):
    print(list1[i], end='\t')
print()
print(list1)
for elem in list1:
    print (elem)
for index, elem in enumerate(list1):
    print(index, elem)
list1.append(200)
print(list1)
list1.insert(0,400)
print(list1)
list1.pop(len(list1)-1)
print(list1)
list1.remove(400)
print(list1)
list1.clear()
print(list1)
fruits = ['apple','mango','orange','banana']
fruits1= fruits[::-1]
print (fruits1)
print(sorted(fruits))
fruits2 = sorted(fruits, reverse = True)
print(fruits2)
fruits1.sort()
print(fruits1)


#生成式和生成器
import sys
f=[x for x in range(1,10)]
print(f)
f=[x+y for x in 'ABCDE' for y in '12345']
print(f)
f=[x**2 for x in range(1,100)]
print(sys.getsizeof(f))
print(f)
f=(x**2 for x in range(1,100))
print(sys.getsizeof(f))
print(f)
for val in f:
    print(val, end = '\t')


#通过yield关键字将一个普通函数改造成生成器函数
def fib(n):
    a,b = 0, 1
    for i in range(n):
        a,b=b,a+b
        yield a
def fib_main():
    n = int(input('请输入所需斐波拉契数个数'))
    for val in fib(n):
        print(val, end = '\t')
if __name__ == "__main__":
    fib_main()


#在屏幕上显示跑马灯文字
import os
import time
def main():
    string1 = '北京欢迎你为你开天辟地…………'
    while True:
        os.system("clear")
        print(string1)
        time.sleep(0.2)
        string1 = string1[1:] + string1[0]
main()

#生成指定长度的验证码
import random
def generate_code(code_len=4):
    all_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    code = ''
    for _ in range(code_len):
        index = random.randint(0,len(all_chars)-1)
        code+=all_chars[index]
    return code
print (generate_code(4))


#约瑟夫环
def main(total_persons=30,count_number=9):
    persons = [True] * total_persons
    deadNumber, index, number = 0,0,0
    while deadNumber < 15:
        if persons[index]:
            number += 1
            if number == count_number:
                persons[index] = False
                deadNumber += 1
                number = 0
        index += 1
        index %= 30
    for person in persons:
        print ('live' if person else 'dead', end='\t')
    print()
    print('下面这些人很不幸：')
    for x, y in enumerate(persons):
        if y==False:
            print (x, end='  ')
main()


#谁最后留下来
def main(total_persons=41,cycle_number=3):
    persons = [True] * total_persons
    deadNumber, index, number = 0,0,0
    while deadNumber < total_persons-cycle_number+1:
        if persons[index]:
            number += 1
            if number == cycle_number:
                persons[index] = False
                deadNumber += 1
                number = 0
        index += 1
        index %= total_persons
    print('下面这些人很幸运：')
    for x, y in enumerate(persons):
        if y==True:
            print (x+1, end='  ')
main(41, 3)


#计算最大公约数和最小公倍数
def gcd(x,y):
    (x,y) = (y,x) if x > y else (x,y)
    for factor in range (x,0,-1):
        if x % factor == 0 and y % factor == 0:
            return factor
def lcm (x,y):
    return (x*y//gcd(x,y))
def main():
    x=int(input('请输入一个整数'))
    y=int(input('请输入另一个整数'))
    print ('%d和%d的最大公约数是%d' %(x,y,gcd(x,y)))
    print ('%d和%d的最小公倍数是%d' %(x,y,lcm(x,y)))
main()


#定义一个类描述平面上的点并提供移动点和计算到另一个点距离的方法
from math import sqrt
class Point(object):
  def __init__(self,x=0,y=0):
    self.x = x
    self.y = y
  def move_to(self,x,y):
    self.x = x
    self.y = y
  def move_by(self,dx,dy):
    self.x += dx
    self.y += dy
  def distance_to(self,other):
    dx = self.x - other.x
    dy = self.y - other.y
    return sqrt(dx**2 + dy**2)
  def __str__(self):
    return '(%s, %s)' % (str(self.x), str(self.y))
def main():
  p1 = Point(8,8)
  p2 = Point ()
  print (p1)
  print (p2)
  p2.move_by(-1,2)
  print(p2)
  print('%f' %(p1.distance_to(p2)))
if __name__ == '__main__':
  main()

#property装饰器
class Person(object):
  __slots__ = ('_name','_age')
  def __init__(self,name,age,gender):
    self._name = name
    self._age = age
    self._gender = gender

  @property
  def name(self):
    return self._name

  @property
  def age(self):
    return self._age

  @age.setter
  def age(self, age):
    self._age = age

  def play(self):
    if self._age <=16:
      print('%s正在玩飞行棋。年龄%d,性别是%s' %(self._name,self._age,self._gender))
    else :
      print('%s正在玩斗地主。年龄%d,性别是%s' %(self._name,self._age,self._gender))

def main():
  person = Person('王大磊', 12,'男')
  person.play()
  person.age = 22
  person._gender = '女'
  person.play()
main()


'''
#显示时间
from time import time,localtime,sleep
import os
class Clock(object):
  def __init__(self, hour=0,minute=0,second=0):
    self._hour = hour
    self._minute = minute
    self._second = second

  @classmethod
  def now(cls):
    ctime = localtime(time())
    return cls(ctime.tm_hour,ctime.tm_min,ctime.tm_sec)

  def run(self):
    self._second+=1
    if self._second==60:
      self._second=0
      self._minute+=1
      if self._minute==60:
        self._minute=0
        self._hour+=1
        if self._hour==24:
          self._hour=0
  def show(self):
    return '%02d:%02d:%02d' %(self._hour, self._minute, self._second)
def main():
  clock = Clock.now()
  while True:
    os.system("clear")
    print(clock.show())
    sleep(1)
    clock.run()

if __name__=='__main__':
  main()


#计算1000内所有的完数：一个数等于它的因子之和
from sys import stdout

for j in range(2,1000):
  k=[]
  n=-1
  s=j
  for i in range (1,j):
    if j%i == 0:
      n +=1
      s -=i
      k.append(i)
  if s == 0:
    print (j)
    for i in range(n):
      stdout.write(str(k[i]))
      stdout.write(' ')
    print (k[n])

#图片下载
from time import time
from threading import Thread

import requests


# 继承Thread类创建自定义的线程类
class DownloadHanlder(Thread):

    def __init__(self, url):
        super().__init__()
        self.url = url

    def run(self):
        filename = self.url[self.url.rfind('/') + 1:]
        resp = requests.get(self.url)
        with open ('/Downloads/' + filename, 'wb') as f:
            f.write(resp.content)


def main():
    # 通过requests模块的get函数获取网络资源
    # 下面的代码中使用了天行数据接口提供的网络API
    # 要使用该数据接口需要在天行数据的网站上注册
    # 然后用自己的Key替换掉下面代码的中APIKey即可
    resp = requests.get(
        'http://api.tianapi.com/meinv/?key=a93ff04ec810984aed7576f4f0d2755a&num=10')
    # 将服务器返回的JSON格式的数据解析为字典
    data_model = resp.json()
    print (data_model)
    for mm_dict in data_model['newslist']:
        url = mm_dict['picUrl']
        # 通过多线程的方式实现图片下载
        DownloadHanlder(url).start()


if __name__ == '__main__':
    main()


