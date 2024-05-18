# Track-Your-Payment [v1.0.0]

**Track-Your-Payment** is an intuitive application designed to streamline your payment management. With tailored reminders, adaptable tracking, and seamless calendar integration, take charge of your finances effortlessly. Download now and simplify your payment journey!

## Features
- **Bill Tracking:** Seamlessly manage and track your bills.
- **Smart Notifications:** Receive timely alerts as payment due dates approach.
- **Payment Status:** Easily mark payments as paid or unpaid.
- **Due Date Management:** Set due dates with automatic updates for the next due date.
- **Payment Method Customization:** Personalize your payment methods to suit your preferences.
- **Monthly Reports:** Enjoy the convenience of automatic monthly reports sent directly to your email.

## Tech Stack

### Backend
1. **Node.js (Express.js)**
2. **MongoDB**
3. **Firebase** for notification services
4. **Nodemailer** for email functionality

### Frontend
1. **React Native** (Currently, a dummy page is set up using React)

## Setup

### Prerequisites
- Ensure Docker is installed on your system.

### Environment Variables
Set up environment variables in the :
```bash
PORT=5000
REFRESH_TOKEN_SECRET=<your refresh token secret>
REFRESH_TOKEN_EXPIRY=<your refresh token expiration>
MONGO_DB_URI=<your MongoDB URI>
JWT_EXPIRY=<your JWT expiration>
JWT_SECRET=<your JWT secret>
```

### Starting the Service
Initiate the service by running the following command:
```bash
docker compose up
```

### Additional Docker Commands
- `docker compose down`: Terminate the container.
- `docker ps`: View running containers.

## Open Source Contribution

Contributions to this project, both backend and frontend, are highly encouraged. If interested, please refer to the [issues section](https://github.com/manishdashsharma/Track-Your-Payment/issues) for potential tasks.

### Contribution Guidelines
1. Submit a Pull Request (PR) with comprehensive comments.
2. Include me as a reviewer.
3. Attach a screenshot or video showcasing your contributions.

## Access to Resources
- [Backend Postman Documentation](https://documenter.getpostman.com/view/26372308/2sA3JT3yHd)
- [Frontend Status Page](http://localhost:5173/server-status) Note: Ensure the container is operational.

Feel empowered to contribute and enhance **Track-Your-Payment**!