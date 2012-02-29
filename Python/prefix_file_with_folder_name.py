#!/usr/bin/python

import os

''' 
  rename files in a directory and it's subdirectories,
  prefix them with the folder name
'''

whereami = os.getcwd()
whereami = os.path.basename(whereami)

for cwd, dirs, files in os.walk('.'):
<<<<<<< HEAD
  for file in files:
    pwd = os.path.abspath(cwd)
    prefix = os.path.basename(pwd)

    old = pwd + '/' + file
    new = pwd + '/' + prefix + '_' + file
    
    if (prefix == whereami):
      pass # don't rename files from where the script started?
    else:
      print 'Renaming ', old, 'to ', new
      os.system('mv ' + old + ' ' + new)
=======
    for file in files:
        pwd = os.path.abspath(cwd)
        prefix = os.path.basename(pwd)

        old = pwd + '/' + file
        new = pwd + '/' + prefix + '_' + file
        
        if (prefix == whereami):
            pass # don't rename files from where the script started?
        else:
            print 'Renaming ', old, 'to ', new
            os.system('mv ' + old + ' ' + new)
>>>>>>> f79c8922aeeae3999d59887854d3652e1b9e2833
