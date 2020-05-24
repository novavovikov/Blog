from git import Repo

from paths import root_dir


def git_push(*args, branch_name=None, commit_message=None):
    try:
        repo = Repo(f'{root_dir}/.git')
        print('_______________')
        print(repo)
        repo.create_head(branch_name)
        repo.git.add(update=True)
        repo.index.commit(commit_message)
        origin = repo.remote(name='origin')
        origin.push()
    except ValueError:
        print(ValueError)
