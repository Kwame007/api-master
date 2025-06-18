# ApiMaster

A modern Angular application that demonstrates REST API integration with comprehensive error handling and retry strategies. This project serves as a template for building robust API-driven applications using Angular 19.

## 🚀 Features

- **REST API Integration**: Complete CRUD operations (GET, POST, PUT, DELETE)
- **Error Handling**: Centralized error handling with custom error messages
- **Retry Strategy**: Automatic retry mechanism for failed API calls
- **Environment Configuration**: Multi-environment support (development, staging, production)
- **TypeScript**: Full type safety with interfaces and type definitions
- **Modern Angular**: Built with Angular 19 and latest best practices

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 19.2.14 or higher)

### Installing Angular CLI

```bash
npm install -g @angular/cli
```

## 🛠️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/` to view the application.

## 📜 Available NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `ng serve` | Starts the development server on `http://localhost:4200/` |
| `build` | `ng build` | Builds the project for production in the `dist/` folder |
| `watch` | `ng build --watch --configuration development` | Builds the project in watch mode for development |
| `test` | `ng test` | Runs unit tests using Karma test runner |
| `ng` | `ng` | Provides access to Angular CLI commands |

### Additional Angular CLI Commands

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new interface
ng generate interface interface-name

# Build for specific environment
ng build --configuration=development
ng build --configuration=staging
ng build --configuration=production

# Serve with specific configuration
ng serve --configuration=production
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── post.interface.ts          # TypeScript interface for Post data
│   ├── services/
│   │   ├── api-client.service.ts      # Main API service with CRUD operations
│   │   └── error-handler.service.ts   # Centralized error handling
│   ├── app.component.ts               # Main application component
│   ├── app.component.html             # Main component template
│   ├── app.component.scss             # Main component styles
│   ├── app.config.ts                  # Application configuration
│   ├── app.module.ts                  # Main application module
│   └── app.routes.ts                  # Application routing
├── environments/
│   ├── environment.ts                 # Default environment (production)
│   ├── environment.development.ts     # Development environment
│   ├── environment.staging.ts         # Staging environment
│   └── environment.production.ts      # Production environment
├── index.html                         # Main HTML file
├── main.ts                           # Application entry point
└── styles.scss                       # Global styles
```

## 🔧 Key Components and Services

### ApiClientService
Located in `src/app/services/api-client.service.ts`
- Handles all HTTP requests to the REST API
- Implements CRUD operations (GET, POST, PUT, DELETE)
- Uses environment configuration for API URLs
- Integrates with error handling and retry strategies

### ErrorHandlerService
Located in `src/app/services/error-handler.service.ts`
- Centralized error handling for all API calls
- Provides custom error messages based on error types
- Implements retry strategy with configurable retry count and delay
- Handles both client-side and server-side errors

### Post Interface
Located in `src/app/models/post.interface.ts`
- TypeScript interface defining the structure of Post data
- Ensures type safety across the application

## 🌍 Environment Configuration

The application supports multiple environments with different configurations:

- **Development**: Optimized for debugging with source maps
- **Staging**: Intermediate environment for testing
- **Production**: Optimized build with minification and tree shaking

Each environment can be configured with different API endpoints, feature flags, and other environment-specific settings.

## 🧪 Testing

Run the test suite using:

```bash
npm test
```

This will execute unit tests using Karma test runner and Jasmine testing framework.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/api-master/` directory.

## 🔍 API Integration

The application is currently configured to work with [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake REST API for testing and prototyping. The API endpoints include:

- **Posts**: `/posts` - CRUD operations for blog posts
- **Comments**: `/comments` - Post comments
- **Users**: `/users` - User data
- **Albums**: `/albums` - Photo albums
- **Photos**: `/photos` - Photo data
- **Todos**: `/todos` - Todo items

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information about your problem
3. Include steps to reproduce the issue and any error messages

## 🔗 Useful Links

- [Angular Documentation](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
