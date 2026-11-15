# Nyoria चिना - REST API Documentation

Base URL: `http://localhost:5001/api`

---

## 1. Authentication Endpoints

### Register User
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "fullName": "Sujan Sharma",
    "nwaranName": "शिव प्रसाद",
    "dateOfBirth": "1996-05-14",
    "timeOfBirth": "06:30",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "preferredLanguage": "ne"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "user": {
      "id": "usr-1700000000000",
      "email": "user@example.com",
      "fullName": "Sujan Sharma",
      "role": "user",
      "preferredLanguage": "ne"
    }
  }
  ```

### Login User
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "demo@nyoriachina.com",
    "password": "demo1234"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "user": { ... },
    "token": "jwt-usr-demo-01-..."
  }
  ```

---

## 2. Palm Reading Endpoints

### Analyze Palm Image
- **POST** `/palm/analyze`
- **Headers**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data` OR `application/json` with `imageBase64`
- **Body**:
  ```json
  {
    "handType": "right",
    "imageBase64": "data:image/jpeg;base64,..."
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "quality": {
      "status": "verified",
      "messageEn": "Optimal image clarity",
      "messageNe": "फोटो उपयुक्त छ",
      "isAcceptable": true
    },
    "reading": {
      "id": "plm-1700000000",
      "handType": "right",
      "analysis": {
        "features": {
          "lifeLine": { ... },
          "headLine": { ... },
          "heartLine": { ... },
          "fateLine": { ... },
          "sunLine": { ... },
          "marriageLine": { ... },
          "mounts": { ... }
        },
        "interpretations": {
          "generalSummary": { "en": "...", "ne": "..." },
          "career": { "en": "...", "ne": "..." },
          "loveAndRelationships": { "en": "...", "ne": "..." },
          "financialSymbolism": { "en": "...", "ne": "..." }
        }
      }
    }
  }
  ```

---

## 3. Kundali Endpoints

### Generate Vedic Kundali
- **POST** `/kundali/generate`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "fullName": "Sujan Sharma",
    "nwaranName": "शिव प्रसाद",
    "dateOfBirth": "1996-05-14",
    "timeOfBirth": "06:30",
    "gender": "male",
    "country": "Nepal",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "birthplace": "Pashupatinath, Kathmandu"
  }
  ```
- **Response** (201 Created):
  Returns Lagna, Rashi, Nakshatra, Pada, Tithi, Yoga, Karana, 9 Planetary Positions with dignities, Rashi Chart (D-1), Navamsa Chart (D-9), 120-year Vimshottari Dasha timeline, Manglik Dosha analysis, and comprehensive interpretations.

---

## 4. AI Voice & Text Assistant

### Send Chat Message
- **POST** `/assistant/chat`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "message": "मेरो जीवन रेखाको अर्थ के हो?",
    "language": "ne"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "conversationId": "conv-...",
      "userMessage": { ... },
      "assistantMessage": {
        "id": "msg-...",
        "text": "जीवन रेखाले शारीरिक जीवन्तता र स्वास्थ्य ऊर्जा स्तरलाई संकेत गर्छ...",
        "createdAt": "..."
      }
    }
  }
  ```

---

## 5. Reports & User Endpoints
- **GET** `/reports` - Retrieve all saved reports for the authenticated user
- **GET** `/reports/:id` - Retrieve specific palm reading or kundali by ID
- **DELETE** `/reports/:id` - Delete saved reading permanently
- **GET** `/user/profile` - Fetch current user profile
- **PUT** `/user/profile` - Update profile birth details or language
