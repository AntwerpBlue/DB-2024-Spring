import xml.dom.minidom
import zipfile
import os
import shutil

import sys

if len(sys.argv) < 2:
    print("请提供 Excel 文件路径作为参数")
    sys.exit(1)

file_path = sys.argv[1]

output_path = 'data'  # 解压 Excel 后的临时文件夹名称

md_path = file_path.split('.')[0] + ".md"  # 输出的 Markdown 文件名

# 解压 Excel 文件
with zipfile.ZipFile(file_path, 'r') as zip_ref:
    zip_ref.extractall(output_path)

strings = []

# 读取共享字符串
shared_strings_path = os.path.join(output_path, "xl/sharedStrings.xml")
if os.path.exists(shared_strings_path):
    with open(shared_strings_path, 'r') as data:
        # 将 XML 文件转化为 DOM 结构
        dom = xml.dom.minidom.parse(data)
        # 找到所有 t 标签
        for string in dom.getElementsByTagName('t'):
            # 将 t 标签中的字符串值加到 strings 数组中
            strings.append(string.childNodes[0].nodeValue)

result = []

# 读取表格数据
sheet_path = os.path.join(output_path, "xl/worksheets/sheet1.xml")
if os.path.exists(sheet_path):
    with open(sheet_path, 'r') as data:
        dom = xml.dom.minidom.parse(data)
        # 遍历每一个 row 标签
        for row in dom.getElementsByTagName('row'):
            row_data = []
            # 遍历 row 标签中包含的每个 c 标签
            for cell in row.getElementsByTagName('c'):
                value = ''
                # 如果该 c 标签的 t 属性值为 s，说明是字符串，需要到 strings 中获取其真实值
                if cell.getAttribute('t') == 's':
                    shared_string_index = int(cell.getElementsByTagName('v')[0].childNodes[0].nodeValue)
                    value = strings[shared_string_index]
                # 否则直接读取其值
                else:
                    value = cell.getElementsByTagName('v')[0].childNodes[0].nodeValue
                # 将这一格的数据添加到 row_data 中
                row_data.append(value)
            # 将这一行的数据添加到 result 中
            result.append(row_data)

# 删除临时文件夹
shutil.rmtree(output_path)

# 构建 Markdown 表格
# 生成第一行
markdown_table = "|"
markdown_table += "|".join(result[0]) + "|"
markdown_table += "\n"
# 生成分隔行（第二行）
markdown_table += "|"
markdown_table += "|".join(["-" for _ in result[0]]) + "|"
markdown_table += "\n"
# 生成后续的行
for row in result[1:]:
    markdown_table += "|"
    markdown_table += "|".join([value for value in row]) + "|"
    markdown_table += "\n"
# 去除多余的换行符
markdown_table = markdown_table[:-1]

# 生成 Markdown 文件
with open(md_path, 'w') as md_file:
    md_file.write(markdown_table)
