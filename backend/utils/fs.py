import os


def rm_tree(path_to_dir: str):
    for root, dirs, files in os.walk(path_to_dir, topdown=False):
        for name in files:
            os.remove(os.path.join(root, name))
        for name in dirs:
            os.rmdir(os.path.join(root, name))
    os.rmdir(path_to_dir)
