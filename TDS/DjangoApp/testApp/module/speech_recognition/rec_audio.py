import speech_recognition as sr

class speech_recognition : 
    def __init__(self, file, word):
        # self.__recognizer = sr.Recognizer()
        # self.audio = 0
        # self.recording(self.__recognizer)
        self.__file = file
        self.__word = word
        self.__prononciation = self.textRecognizerWithFile(self.__file , self.__word)
        self.__detectedWordResult = ""
        
        
    # def recording(self , recognizer):
    #     # r = sr.Recognizer()
    #     with sr.Microphone() as src:
    #         recognizer.adjust_for_ambient_noise(src)

    #         print("Say something !")
    #         self.audio = recognizer.listen(src)

    #         print(" Recording now")
    #         self.recognizer(recognizer)
    
    # def recognizer(self, recognizer):
    #     try:
    #         text = recognizer.recognize_google(self.audio)
    #         if text == "hello world":
    #             print("success !")
    #         else:
    #             print("Wrong answer !\n")
    #             print("Can try again")
    #             self.recording(self.__recognizer)
    #     except Exception as e:
    #         print("Error : " + str(e))

    #     #with open("recordertext.txt", "w") as file:
    #     #   file.write(text)

    def textRecognizerWithFile(self, file, word):

        r = sr.Recognizer()
        with sr.AudioFile(file) as src:
            # Cette ligne commentée fait tous bugger !!!!!!!!!!!!
            # r.adjust_for_ambient_noise(src)
            audio = r.listen(src)
            try:
                text = r.recognize_google(audio, language="nl-NL")
                if text == word:
                    return True 
                else:
                    print(text + " | " + word)
                    return False
            except Exception:
                return -1

    # @property
    def getPrononciation(self):
        return self.__prononciation

    # @property
    def getDetectedWord(self):
        return self.__detectedWordResult

