# COde 1 - Auto narration working fine

import pyttsx3
import threading

engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[132].id)
engine.setProperty('rate', 150)

speech_lock = threading.Lock()

def narrate(text):
    
    global engine

    if text == "stop":
        engine.stop()  
        # is_speaking = False  
        print("Narrate: stop called")
    else:
        print(f"Narrate: saying '{text}'")
        # is_speaking = True
        engine.say(text)
        engine.runAndWait()
        # is_speaking = False
        print(f"Narrate: finished '{text}'")
    return    
  


#Code 2


# import pyttsx3
# import threading

# engine = pyttsx3.init()
# voices = engine.getProperty('voices')
# engine.setProperty('voice', voices[132].id)
# engine.setProperty('rate', 150)

# speech_lock = threading.Lock()
# speech_thread = None

# def narrate(text):
    
#     global engine, speech_thread

#     if text == "stop":
#         engine.stop()  
#         # is_speaking = False  
#         print("Narrate: stop called")
#         return
    
#     def speak():
#         with speech_lock:
#             print(f"Narrate: saying '{text}'")
#             engine.say(text)
#             engine.runAndWait()
#             print(f"Narrate: finished '{text}'")

#     # engine.stop()

#     speech_thread = threading.Thread(target=speak)
#     speech_thread.start()        

#     return    
    


# Code 3


# import pyttsx3
# import threading
# import queue
# # from main import narration_queue


# engine = pyttsx3.init()
# voices = engine.getProperty('voices')
# engine.setProperty('voice', voices[132].id)
# engine.setProperty('rate', 150)

#  #create  a queue for all the text narration
# stop_flag = threading.Event() #create a flag that changes on stop
# narration_queue = queue.Queue()

# def tts_worker():
#     while True:
#         try:

#             text = narration_queue.get() #get text from queue
#             if text == "__EXIT__":
#                 break
#             if text == "stop": #if text is stop, change the flag and stop the engine
#                 stop_flag.set()
#                 engine.stop()

#                 while not narration_queue.empty():
#                         narration_queue.get_nowait()
#                         narration_queue.task_done()
#                 print("Narration queue cleared")
#                 narration_queue.task_done()
#                 continue

#             stop_flag.clear() #else clear the stop flag value
#             try:
#                 engine.say(text) #speak the text
#                 engine.runAndWait() #wait till speaking is finished
#             except Exception as e:
#                 print("Error in TTS:", e)

#             narration_queue.task_done() #mark it as done

#         except Exception as e:
#                 print(f"TTS Worker: An unexpected error occurred: {e}")


       



           

        
      