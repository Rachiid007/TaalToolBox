# import sounddevice as sd
import pyaudio
from scipy.io.wavfile import write
from scipy.io import wavfile
from scipy.fft import rfft , rfftfreq, fftfreq, fft
import wavio as wv
import parselmouth
import wave
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns #bibliothèque Python de visualisation de données basée sur matplotlib
import math
import os
from module.config import config

class audio_traitement:

    def __init__(self):
        print(config.GOOD_VOCAL_DIR)
        self.__good_vocal_dir = config.GOOD_VOCAL_DIR
        self.__good_vocal_cut_dir = config.GOOD_VOCAL_CUT_DIR
        self.__user_vocal_dir = config.USER_VOCAL_DIR
        
        self.good_vocal = os.listdir(self.__good_vocal_dir)
        
        #simply frequency
        self.freq = 44100
        # time to store data
        self.__duration = 3
        self.__user_vocal = f'{self.__user_vocal_dir}user_sound.wav'
        
        self.__TRESH = 200
        self.audio = pyaudio.PyAudio()
        self.frames = [] # Array pour stocker les trames
        
        # CAS OU LUTILISATEUR ENREGISTRE PAS BESOIN DE CONVERTIR EN MONO CAR SAVE RECOR LE FAIT DEJA
        
        # self.record(self.audio, self.freq , self.__duration, self.frames )
        # self.save_record(self.audio, self.freq, self.frames, self.__user_vocal)
        # samplerate, data = self.generate_data_record(file)
        
        
        # GENERER LE SPECTRE DUN FICHIER PRECIS:
        stereo_file = f"{self.__good_vocal_dir}5d379dba-c3c9-4b00-961b-03a700840a06.wav"
        
       
        # POUR GENERER LES DONNEES DU SPECTRE 
        #self.save_record(self.audio, self.freq , self.frames , file)
        mono_file = self.convert_sterio_mono(stereo_file)
        samplerate, data = self.generate_data_record(mono_file)
        print('data' , samplerate , "data" , data , "longueur de données" , len(data)) 
        
        # TRAITEMENT DES DONNEES DU SIGNAL
        data_cut = self.cutSignal(samplerate, data , self.__good_vocal_cut_dir , self.__TRESH)
        efficace_data = self.efficace_value(data_cut)
        moving_data = self.moving_average_of_2d_array(efficace_data)

        # TRAITEMENT DU SIGNAL ET GENERATION DU SPECTRE
        fft_data = self.fast_fourier_transform(moving_data)
        rms = self.rms_of_signal(moving_data)
        
        # Pour génerer le spectre d'un fichier précis
        self.generate_graph(mono_file , data_cut, moving_data, fft_data)


    def record(self,audio, freq, duration, frames):

        print('Recording')

        stream = audio.open(format=pyaudio.paInt16, channels=1, rate=freq, frames_per_buffer=1024, input=True)

        # Store data in chunks for 3 seconds
        for i in range(0, int(freq / 1024 * duration)):
            data = stream.read(1024)
            frames.append(data)

        # Stop and close the stream
        stream.stop_stream()
        stream.close()
        # Terminate the PortAudio interface
        audio.terminate()
        
    def save_record(self ,audio, freq, frames, user_sound):

        # Save the recorded data as a WAV file
        wf = wave.open(user_sound, 'wb')
        wf.setnchannels(1)
        wf.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
        wf.setframerate(freq)
        wf.writeframes(b''.join(frames))
        wf.close()

        # samplerate, data = wavfile.read(user_sound)
        # print( "sample rate" , samplerate , "longueur de data : "  , len(data) )
        # return samplerate, data

    def convert_sterio_mono(self , file):
        SPF = wave.open(file, "r")

        # On vérifie que l'enregistrement est bien en mono
        # Si pas on le passe du stéréo au mono  
        if SPF.getnchannels() != 1:
            from pydub import AudioSegment
            sound = AudioSegment.from_wav(file)
            # On passe en mono 
            sound = sound.set_channels(1)
            # On exporte le fichier mono 
            sound.export(file, format="wav")
            # On remplace la variable par le nouveau fichier mono
            # file = "nostereo.wav"
        return file
            
            
    def generate_data_record(self , user_sound):
        samplerate, data = wavfile.read(user_sound)
        return samplerate, data
    
    def cutSignal(self ,samplerate, data , data_cur_dir, tresh):

        in_index = 0
        out_index = 0
        # Parcour le tableau de données (tresh  = 200)
    
        # si data[0]>200
        # in_index = index actuelle
        
        # parcourir le second tableau : 
        # si data
        for i in range(0, len(data)):
            if data[i] > tresh:
                in_index = i
                break
        for o in range(0, len(data)):
            if data[-o] > tresh:
                out_index = -o
                break
            # print(in_index)
            # print(out_index)
            # print(f"longueur du signal: {len(data)}" )
            # print(len(data) + out_index)

        print(f"Moyenne du signal: {sum(data)/len(data)}")

        data_processed = data[int(in_index): len(data) + int(out_index)]
        
        # Récréer le fichier sans le
        scaled = np.int16(data_processed)
        wavfile.write(f'{data_cur_dir}5d379dba-c3c9-4b00-961b-03a700840a06.wav', samplerate, scaled)
        return data_processed
    
    def efficace_value(self , array):
        efficace_array = []
        # TODO Prendre chaque tableau dans la matrice et faire la valeur efficace
        # Voir comment faire la valeur efficace du tableau
        # for ind in range(len(array)):
            # efficace_array.append(np.sqrt(np.mean(np.array(array)**2)))

        efficace_array = abs(np.array(array))

        # print(efficace_array)

        return efficace_array
    
    
    def moving_average_of_2d_array(self, list_array, window=1001):
        array_average = []
        array = list(list_array)
        import functools
  
        for ind in range(len(array)):
            if ind < window//2 :
                actual_ind = functools.reduce(lambda x, y : x+y , array[ind: ind + (window//2)+1])
                if ind > 0:
                    actual_ind = actual_ind + functools.reduce(lambda x, y : x+y , array[0 : ind])
                average_ind = actual_ind/window
                array_average.append(average_ind)
            elif ind >= len(array) - (window//2):
                actual_ind = functools.reduce(lambda x, y : x+y , array[ind - (window//2) : ind+1 ])
                if ind < len(array)-1:
                    actual_ind = actual_ind + functools.reduce(lambda x, y : x+y , array[ind+1:])
                average_ind = actual_ind/window
                array_average.append(average_ind)
                
            else:
                actual_ind = functools.reduce(lambda x, y : x+y ,  array[ind - (window//2) : ind]) 
                actual_ind = actual_ind + functools.reduce(lambda x, y : x+y ,  array[ind: ind+((window//2)+1)]) 
                average_ind = actual_ind/window
                array_average.append(average_ind)

        print(f" leng == {len(array_average)}")
        return array_average
    
    def fast_fourier_transform(self, array):
        # fft = np.fft.fft(array)
        print(f"len array in fft {len(array)}")
        rfft_data = rfft(array)
        return rfft_data

    def rms_of_signal(self, array):
        rms = np.sqrt(np.mean(np.array(array)**2))
        return rms

    # This will convert the NumPy array to an audio
    # file with the given sampling frequency
    # write("recording0.wav", freq, recording)

    # Convert the NumPy array to audio file
    # wv.write("recording1.wav", recording, freq, sampwidth=2)
    def generate_graph(self , user_sound , data_cut, moving_data, data):
        # print("Bonjour", data)
        sns.set()

        plt.rcParams['figure.dpi'] = 100 # Show nicely large images in this notebook
        snd = parselmouth.Sound(user_sound)

        # snd is all the user sound
        # need to elimate all the unused part of the sound
        # detect when the sound start and finish exactly (the time)

        # put all the value of the sound in an array
        snd_part = snd.extract_part(from_time=0, preserve_times=True)

        snd_list = []
  
        fig = plt.figure(figsize=(10,6 ))
        fig.suptitle('Traitement du signal', fontsize = 12)
        fig.subplots_adjust(hspace=0.4, wspace=0.4)
        
        plt.subplot(2, 2, 1)
        plt.plot(snd_part.xs(), snd_part.values.T)
        plt.xlim([snd_part.xmin, snd_part.xmax])
        plt.plot(user_sound)
        plt.xlabel("time [s]")
        plt.ylabel("amplitude")
        plt.title("Signal d'origine", fontsize=10)
        # plt.axis([1.7, 2.5, -0.15 , 0.15])
        # plt.show() # or plt.savefig("sound.png"), or plt.savefig("sound.pdf")
        
        
        plt.subplot(2, 2, 2)
        # plt.plot(snd_part.xs(), snd_part.values.T)
        # plt.xlim([snd_part.xmin, snd_part.xmax])
        plt.plot(data_cut)
        plt.xlabel("time [s]")
        plt.ylabel("amplitude")
        plt.title("Signal après extraction des partie inutile")
        
        plt.subplot(2, 2, 3)
        # plt.plot(snd_part.xs(), snd_part.values.T)
        # plt.xlim([snd_part.xmin, snd_part.xmax])
        plt.plot(moving_data)
        plt.xlabel("time [s]")
        plt.ylabel("amplitude")
        plt.title("Signal après avoir effectué une moyenne glissante", fontsize=10)
        
        plt.plot(moving_data)
        
        plt.subplot(2, 2, 4)
        xf = rfftfreq((len(data)*2)-1, 1 / self.freq)
        # xf = fftfreq(len(data), 1 / self.freq)
        plt.plot(xf , np.abs(data))
        plt.title("Signal après traitement", fontsize=10)

        plt.show() # or plt.savefig("sound.png"), or plt.savefig("sound.pdf")





    def closest_value(average_list, average_value):
        arr = np.asarray(average_list)
        i = (np.abs(arr - average_value)).argmin()
        return arr[i]