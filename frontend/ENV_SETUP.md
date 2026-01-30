# Environment Variables Setup

## 1. Create .env file

Create a `.env` file in the `skill swap` directory (same level as `package.json`):

```env
VITE_API_BASE_URL=http://localhost:8081/api
```

## 2. For Production

Update the `.env` file with your production API URL:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## 3. Important Notes

- The `.env` file should NOT be committed to git (already in .gitignore)
- Vite requires the `VITE_` prefix for environment variables
- After changing `.env`, restart the dev server
- The API configuration is centralized in `src/config/api.js`

## 4. Usage

The API endpoints are imported from `src/config/api.js`:

```javascript
import { API_ENDPOINTS } from '../../config/api';

// Use in axios calls
axios.post(API_ENDPOINTS.USER_LOGIN, data);
```

