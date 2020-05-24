from os import path

root_dir = path.dirname(__file__)

# directories
temp_dir = path.join(root_dir, 'temp/')
data_dir = path.join(root_dir, 'data/')
icons_dir = path.join(root_dir, 'frontend', 'icons/')

articles_dir = path.join(data_dir, 'articles/')

# files
tags_file = path.join(temp_dir, 'tags.yml')
