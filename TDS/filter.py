import numpy as np
import matplotlib.pyplot as plt
from scipy.fft import rfft, rfftfreq, irfft
from scipy.io import wavfile
import wave


# On indique le fichier à traiter 
file = "testrec2.wav"

# On ouvre le fichier 
SPF = wave.open(file, "r")

# On vérifie que l'enregistrement est bien en mono
# Si pas on le passe du stéréo au mono  
if SPF.getnchannels() != 1:
    from pydub import AudioSegment
    sound = AudioSegment.from_wav(file)
    # On passe en mono 
    sound = sound.set_channels(1)
    # On exporte le fichier mono 
    sound.export("nostereo.wav", format="wav")
    # On remplace la variable par le nouveau fichier mono
    file = "nostereo.wav"

# Si on ne met pas en mono, on aura des problèmes lors de la suite du programme (notamment avec l'affichage)

# Du fichier lu on extrait les données et la fréquence d'échantillonage
samplerate, data = wavfile.read(file)

# La durée de l'enregistrement vaut le nombre d'échantillons (et donc de données) divisé par la fréquence d'échantillonage
DURATION = data.size / samplerate  

N = data.size

print(type(int(data.size/2)))
print(data[int(data.size/2)])
print(data.max())


# Une effectue une transformée de Fourier avec en X la fréquence et en Y l'amplitude 
yf = rfft(data)
xf = rfftfreq(N, 1 / samplerate)


# On crée plot, un où l'on affiche le signal de base et l'autre où l'on affiche sa transformée de Fourier
plt.subplot(121)
plt.plot(data)
plt.xlabel("Temps")
plt.ylabel("Amplitude")

# plt.figure()
plt.subplot(122)
plt.plot(xf, np.abs(yf))
plt.xlabel("Fréquence")
plt.ylabel("Amplitude")
plt.xlim([0, 20000])


# Ici on va filter la transformée de Fourier obtenue en ne guardant que les valeurs d'amplitude plus grandes que un certain pourcentage de l'amplitude MAX.
# Ce pourcentage est ici donnée par la variable filter_threshold

filter_threshold = 0.01

# Il est important de notter que on utilise deux signaux: 
#   - Un signal regroupant les valeurs absolues de la transformée de Fourier du signal d'origine (filtered_sign)
#   - Un signal qui est juste la copie de la transformée de Fourier (filtered_sign2) et qui sera filtré 
#---------------------------------------------------------------------------------------------------------------
#   Pourquoi filtrer sign2 et pas sign ? 
#__________________________________________
# Le problème est que l'on ne peut pas faire de transformée de Fourier inverse sur filtered_sign à cause du 'np.abs()' qui a été appliqué 
# Donc on check l'amplitude sur filtered_sign et on applique la mise à 0 sur filtered_sign2
#---------------------------------------------------------------------------------------------------------------

filtered_sign = np.abs(yf.copy())
filtered_sign2 = yf.copy()
max_value = filtered_sign.max()
print(max_value)

# La valeur de seuil est définie par: La valeur maximale du signal (la plus grand amplitude) multipliée par le filter_treshold (qui elle définit le pourcentage à prendre de cette valeur max)
#  

max_value_with_threshold = max_value * filter_threshold
# On parcour toutes les données de la transformée de Fourier du signal de base
for i in range(0, len(filtered_sign)):
# Si une valeur d'amplitude est plus petite que le niveau configuré, alors elle est mise à 0  
    if filtered_sign[i] <= max_value_with_threshold:
        filtered_sign2[i] = 0
# filtered_sign[data.max()] = 0;

# Ici on montre une figure avec à gauche la fft filtrée et à droite la fft d'origine
plt.figure()
plt.subplot(1, 2, 1)
plt.plot(xf, filtered_sign2)
plt.subplot(1, 2, 2)
plt.plot(xf, np.abs(yf))

# Ici on effectue une transformée de Fourier inverse pour revenir dans le domaine temporel 
# Ensuite on affiche le signal initial avec le signal de sortie (filtré)

# filtered_sign_reversed = np.real(np.fft.ifft(filtered_sign2))
filtered_sign_reversed = irfft(filtered_sign2)
print(filtered_sign_reversed)
plt.figure()
plt.subplot(1, 2, 1)
plt.plot(data)
plt.subplot(1, 2, 2)
plt.plot(filtered_sign_reversed)
plt.show()


# Ici on va écrire dans un fichier le nouveau signal pour pouvoir l'écouter

# result = np.array(filtered_sign2)
scaled = np.int16(filtered_sign_reversed)
print(filtered_sign2)
wavfile.write("test.wav", samplerate, scaled)


# ---------------------------------
# PROBLEME: Un bruit vien se rajouter au signal filtré 
# CAUSE: ? (Peut être le fait que l'on met des nombres imaginaires à 0 ?)
# SOLUTION: ?
# ---------------------------------
print("Program finished !")


# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Autre bout de code dont je me suis inspiré:
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

# th_list = np.linspace(0,1,5)
# th_list = th_list[0:len(th_list)-1]

# def fft_filter_amp(th):
# 
#     fft_tof_abs=np.abs(yf.copy())
# # On prend le chiffre en % 
#     fft_tof_abs=2*fft_tof_abs/len(data)
#     print(fft_tof_abs)
#     fft_tof_abs[fft_tof_abs<=th]=0
#     return fft_tof_abs[0:int(len(fft_tof_abs)/2.)]

# for i in range(0,4):
#     plt.subplot(2,2,i+1)
#     th_i=th_list[i].round(2)
#     th_filter = fft_filter_amp(th_i)
#     plt.plot(th_filter[0:int(len(yf)/2.)],color='firebrick',label='Threshold = %.2f'%(th_list[i]))
#     plt.xlabel('Frequency Space (1/days)')
#     plt.ylabel('Fourier Amplitude')
#     plt.legend()
# plt.tight_layout()
# plt.show()

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
