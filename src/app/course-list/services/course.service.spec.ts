import { CourseService } from './course.service';
import { coursesMock } from './course.mock';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    service = new CourseService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get course list', (done) => {
    service.getCourses().subscribe((courses) => {
      expect(courses).toEqual(coursesMock);
      done();
    });
  });
});
