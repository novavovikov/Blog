import pathlib

from paths import tags_file


def create_temp_folder():
    pathlib.Path(tags_file).parent.mkdir(parents=True, exist_ok=True)
