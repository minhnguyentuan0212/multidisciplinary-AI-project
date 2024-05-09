import cv2
import dlib
import numpy as np
from skimage import feature

class LiveChecking:
    def eye_aspect_ratio(self,eye):
        A = np.linalg.norm(eye[1] - eye[5])
        B = np.linalg.norm(eye[2] - eye[4])
        C = np.linalg.norm(eye[0] - eye[3])
        return (A + B) / (2.0 * C)

    def extract_texture(self,image):
        # Using Local Binary Pattern for texture analysis
        lbp = feature.local_binary_pattern(image, 24, 8, method="uniform")
        n_bins = int(lbp.max() + 1)
        hist, _ = np.histogram(lbp, density=True, bins=n_bins, range=(0, n_bins))
        return hist

    def __call__(self, frame):
        # Initialize dlib's face detector and landmark predictor
        detector = dlib.get_frontal_face_detector()
        predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

        cap = cv2.VideoCapture(0)
        live = False

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = detector(gray)
            
            for face in faces:
                landmarks = predictor(gray, face)
                
                # Blink detection
                left_eye = np.array([(landmarks.part(n).x, landmarks.part(n).y) for n in range(36, 42)])
                right_eye = np.array([(landmarks.part(n).x, landmarks.part(n).y) for n in range(42, 48)])
                left_ear = self.eye_aspect_ratio(left_eye)
                right_ear = self.eye_aspect_ratio(right_eye)
                ear = (left_ear + right_ear) / 2.0

                # Extract facial region for texture analysis
                x, y, w, h = face.left(), face.top(), face.width(), face.height()
                face_region = gray[y:y+h, x:x+w]
                texture_hist = self.extract_texture(face_region)
                if live and ear > 0.2:
                    cropped_frame = frame[y:y+h, x:x+w]
                    cv2.imwrite("frame_extracted.png", cropped_frame)
                # Check ear threshold for blink detection and analyze texture for smoothness
                if ear < 0.2 and np.mean(texture_hist) < 0.05:  # Adjust texture threshold as needed
                    cv2.putText(frame, 'Live', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                    live = True
                    # do something here
                else:
                    if live:
                        cv2.putText(frame, 'Live', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                    else:
                        cv2.putText(frame, 'Not Live', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

                # Draw the face bounding boxq
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)


            cv2.imshow('Liveness Detection', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
        return frame