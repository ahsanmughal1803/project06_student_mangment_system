class Student {
  private static studentCount: number = 0;
  private id: string;
  private name: string;
  private courses: string[] = [];
  private facilities: string[] = [];
  private balance: number = 0;

  constructor(name: string) {
    this.name = name;
    this.id = this.generateStudentID();
    Student.studentCount++;
  }

  private generateStudentID(): string {
    const uniqueID = (Math.floor(10000 + Math.random() * 90000)).toString();
    return uniqueID;
  }

  public enrollCourse(course: string): void {
    this.courses.push(course);
  }

  public enrollFacility(facility: string): void {
    this.facilities.push(facility);
  }

  public viewBalance(): number {
    return this.balance;
  }

  public payTuition(amount: number): void {
    this.balance += amount;
    console.log(`Payment of $${amount} received. New balance: $${this.balance}`);
  }

  public showStatus(): void {
    console.log(`Student ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
    console.log(`Facilities Enrolled: ${this.facilities.join(', ')}`);
    console.log(`Balance: $${this.balance}`);
  }
}

class StudentManagementSystem {
  private students: Student[] = [];

  public registerStudent(name: string): Student {
    const student = new Student(name);
    this.students.push(student);
    console.log('Registration successful.');
    console.log(`Your Student ID is: ${student['id']}`);
    return student;
  }

  public loginStudent(id: string): Student | undefined {
    const student = this.students.find((s) => s['id'] === id);
    if (student) {
      console.log('Login successful.');
      return student;
    } else {
      console.log('Login failed. Student not found.');
      return undefined;
    }
  }
}

const studentSystem = new StudentManagementSystem();

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function mainMenu(student: Student | undefined): void {
  console.log('\nMain Menu:');
  console.log('1. Register Student');
  console.log('2. Login');
  console.log('3. Exit');

  readline.question('Enter your choice: ', (choice: any) => {
    switch (choice) {
      case '1':
        readline.question('Enter your name: ', (name: string) => {
          studentSystem.registerStudent(name);
          mainMenu(undefined);
        });
        break;
      case '2':
        readline.question('Enter your Student ID: ', (id: string) => {
          const loggedInStudent = studentSystem.loginStudent(id);
          if (loggedInStudent) {
            studentMenu(loggedInStudent);
          } else {
            mainMenu(undefined);
          }
        });
        break;
      case '3':
        console.log('Goodbye!');
        readline.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        mainMenu(undefined);
        break;
    }
  });
}

function studentMenu(student: Student): void {
  console.log('\nStudent Menu:');
  console.log('1. Enroll in a Course');
  console.log('2. Enroll in a Facility');
  console.log('3. View Balance');
  console.log('4. Pay Tuition Fees');
  console.log('5. Show Status');
  console.log('6. Logout');

  readline.question('Enter your choice: ', (choice: any) => {
    switch (choice) {
      case '1':
        readline.question('Enter the course name: ', (course: string) => {
          student.enrollCourse(course);
          console.log(`Enrolled in ${course}`);
          studentMenu(student);
        });
        break;
      case '2':
        readline.question('Enter the facility name: ', (facility: string) => {
          student.enrollFacility(facility);
          console.log(`Enrolled in ${facility}`);
          studentMenu(student);
        });
        break;
      case '3':
        console.log(`Balance: $${student.viewBalance()}`);
        studentMenu(student);
        break;
      case '4':
        readline.question('Enter the amount to pay: $', (amount: string) => {
          student.payTuition(parseFloat(amount));
          studentMenu(student);
        });
        break;
      case '5':
        student.showStatus();
        studentMenu(student);
        break;
      case '6':
        console.log('Logging out...');
        mainMenu(undefined);
        break;
      default:
        console.log('Invalid choice. Please try again.');
        studentMenu(student);
        break;
    }
  });
}

mainMenu(undefined);
