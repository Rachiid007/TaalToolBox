import sys
import os

ROOT_DIRECTORY = "TaalToolBox-AI"

ROOT_DIR = ''
DATASET_DIR = ''
GOOD_VOCAL_DIR = ""
BAD_VOCAL_DIR = ""
GOOD_VOCAL_CUT_DIR = ""
USER_VOCAL_DIR = ""

# TODO SEARCH HOW TO MODIFY VARIABLE GLOBALY IN FUNCTION 
# def assign_other_dir(dir : str , sep : str):
#     DATASET_DIR = f'{dir}{sep}data{sep}set1{sep}'
#     GOOD_VOCAL_DIR = f'{DATASET_DIR}good{sep}"'
#     BAD_VOCAL_DIR = f'{DATASET_DIR}bad{sep}"'
#     GOOD_VOCAL_CUT_DIR = f'{DATASET_DIR}good_cut{sep}"'
#     USER_VOCAL_DIR = f'{DATASET_DIR}user_vocal{sep}"'

# def assign_root_dir(sep : str):
#     if ROOT_DIRECTORY in sys.path[0].split(sep):
#         print("insid this")
#         index_root = sys.path[0].split(sep).index(ROOT_DIRECTORY)
#         ROOT_DIR = sep.join(sys.path[0].split(sep)[:index_root + 1])
#     else:
#         ROOT_DIR = sep.join(sys.path[-1].split(sep)[:])

if sys.platform == "win32":
    sep ="\\"
    if ROOT_DIRECTORY in sys.path[0].split(sep):
        index_root = sys.path[0].split(sep).index(ROOT_DIRECTORY)
        ROOT_DIR = sep.join(sys.path[0].split(sep)[:index_root + 1])
        DATASET_DIR = f'{ROOT_DIR}{sep}data{sep}set1{sep}'
        GOOD_VOCAL_DIR = f'{DATASET_DIR}good{sep}'
        BAD_VOCAL_DIR = f'{DATASET_DIR}bad{sep}'
        GOOD_VOCAL_CUT_DIR = f'{DATASET_DIR}good_cut{sep}'
        USER_VOCAL_DIR = f'{DATASET_DIR}user_vocal{sep}'
    else:
        ROOT_DIR = sep.join(sys.path[-1].split(sep)[:])
        DATASET_DIR = f'{ROOT_DIR}{sep}data{sep}set1{sep}'
        GOOD_VOCAL_DIR = f'{DATASET_DIR}good{sep}'
        BAD_VOCAL_DIR = f'{DATASET_DIR}bad{sep}'
        GOOD_VOCAL_CUT_DIR = f'{DATASET_DIR}good_cut{sep}"'
        USER_VOCAL_DIR = f'{DATASET_DIR}user_vocal{sep}'
    print(GOOD_VOCAL_DIR)
    # assign_other_dir(assign_root_dir(sep), sep)
if sys.platform == "linux":
    sep = "/"
    assign_root_dir(sep)
    assign_other_dir(ROOT_DIR, sep)
