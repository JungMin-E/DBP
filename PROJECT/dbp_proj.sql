CREATE DATABASE dbp_proj;
SHOW DATABASES;
USE dbp_proj;

CREATE TABLE STUDENTS (
STUDENT_ID INT PRIMARY KEY,
NAME VARCHAR(50) NOT NULL
);

CREATE TABLE COURSES (
COURSE_NAME VARCHAR(50) NOT NULL,
PROFESSOR VARCHAR(30) NOT NULL
);

CREATE TABLE ENROLLMENTS (
STUDENT_ID INT,
COURSE_NAME VARCHAR(50),
GRADE CHAR(3),
FOREIGN KEY (STUDENT_ID) REFERENCES STUDENTS(STUDENT_ID),
FOREIGN KEY (COURSE_NAME) REFERENCES COURSES(COURSE_NAME),
PRIMARY KEY (STUDENT_ID, COURSE_NAME)
);

SHOW TABLES;

INSERT INTO STUDENTS(STUDENT_ID, NAME) VALUES
(4407153, 'In-Kyu Lee'), (4407155, 'Dong-Soo Kim'), (4408100, 'Cheol-Soo Kim');

INSERT INTO COURSES(COURSE_NAME, PROFESSOR) VALUES 
('Database', 'Hong Gil-Dong'), ('C Language', 'A Mu-Gae'), ('JavaScript', 'Chun Jae');

INSERT INTO ENROLLMENTS(STUDENT_ID, COURSE_NAME, GRADE) VALUES
(4407153, 'Database', 'A'), (4407153, 'C Language', 'A'), (4407155, 'Database', 'B'), (4407155, 'JavaScript', 'C'),
(4408100, 'Database', 'B'), (4408100, 'C Language', 'B'), (4408100, 'JavaScript', 'B');

USE dbp_proj;
SHOW TABLES;

SELECT s.STUDENT_ID, s.NAME, e.COURSE_NAME, c.PROFESSOR, e.GRADE
FROM STUDENTS s INNER JOIN ENROLLMENTS e ON s.STUDENT_ID = e.STUDENT_ID
                INNER JOIN COURSES c ON e.COURSE_NAME = c.COURSE_NAME;








