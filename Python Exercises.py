# -*- coding: utf-8 -*-

#求阶乘n!
def factorial(num):
    result = 1
    for n in range(1,num+1):
        result*=n
    return result
"""test code
n=int(input('n= '))
print (factorial(n))
"""

#英寸与厘米互换
def inch_cm(length,unit):
    if unit == "in" or unit == "英寸":
        print('%f英寸=%f厘米' %(length, length*2.54))
    elif unit == "cm" or unit == "厘米":
        print('%.2f厘米=%.2f英寸' %(length, length/2.54))
    else:
        print('请输入有效的单位')
'''test code:输入单位时需要加引号(Python版本2)
length = float(input('请输入长度 '))
unit = str(input('请输入单位 '))
inch_cm(length,unit)
'''

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
'''test code
score = float(input('输入你的分数'))
score_grade(score)
'''

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
'''test code
guess_number()
'''

#九九乘法表
def multiply99(number):
    for i in range(1,number+1):
        for j in range(1,i+1):
            print ('%dx%d=%d' %(i,j,i*j), end='\t')
        print()
'''test code
multiply99(9)
'''

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
'''test code
number=int(input('输入一个正整数：'))
prime(number)
'''

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




