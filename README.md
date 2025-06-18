# API Master - Angular Pagination Component

A reusable pagination component for Angular applications with modern UI design and full accessibility support.

## Features

- **Reusable Pagination Component**: Standalone Angular component that can be used across your application
- **Modern UI Design**: Clean, responsive design with hover effects and smooth transitions
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode detection and styling
- **TypeScript Support**: Fully typed with interfaces and proper error handling
- **API Integration**: Example integration with REST APIs using Angular HttpClient

## Components

### PaginationComponent

A standalone pagination component with the following features:

#### Input Properties
- `currentPage: number` - Current active page (default: 1)
- `totalItems: number` - Total number of items to paginate (default: 0)
- `itemsPerPage: number` - Number of items per page (default: 10)
- `maxPagesToShow: number` - Maximum number of page buttons to display (default: 5)

#### Output Events
- `pageChange: EventEmitter<number>` - Emitted when user clicks on a page number

#### Usage Example

```typescript
import { PaginationComponent } from './components/pagination/pagination.component';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <app-pagination
      [currentPage]="currentPage"
      [totalItems]="totalItems"
      [itemsPerPage]="itemsPerPage"
      [maxPagesToShow]="5"
      (pageChange)="onPageChange($event)">
    </app-pagination>
  `
})
export class MyComponent {
  currentPage = 1;
  totalItems = 100;
  itemsPerPage = 10;

  onPageChange(page: number) {
    this.currentPage = page;
    // Load data for the new page
    this.loadData();
  }
}
```

### PostListComponent

A complete example component demonstrating how to use the pagination component with an API service.

## API Service Integration

The project includes an updated `ApiClientService` with pagination support:

```typescript
interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

// Usage
this.apiService.GETWithPagination({
  page: 1,
  limit: 10
}).subscribe(response => {
  this.posts = response.data;
  this.totalItems = response.pagination.totalItems;
  this.currentPage = response.pagination.currentPage;
});
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

## Customization

### Styling

The pagination component uses SCSS with CSS custom properties for easy customization. You can override the styles by:

1. Creating your own stylesheet
2. Using CSS custom properties
3. Modifying the component's SCSS file

### Configuration

The component is highly configurable through its input properties:

- **Items per page**: Adjust `itemsPerPage` to show more or fewer items
- **Page display**: Modify `maxPagesToShow` to control how many page numbers are visible
- **Responsive behavior**: The component automatically adapts to different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
