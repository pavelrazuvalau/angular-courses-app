export interface Course {
  id: number;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
}

export interface CourseResponse {
  courses: Course[];
  hasMoreCourses: boolean;
}
