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

#
