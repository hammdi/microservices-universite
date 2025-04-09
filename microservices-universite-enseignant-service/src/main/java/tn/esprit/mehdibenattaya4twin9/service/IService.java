package tn.esprit.mehdibenattaya4twin9.service;

import tn.esprit.mehdibenattaya4twin9.entity.Teacher;

import java.util.List;

public interface IService {


    List<Teacher> getAllTeachers();
    Teacher getTeacherById(Long id);
    Teacher addTeacher(Teacher teacher);
    Teacher updateTeacher(Long id, Teacher teacher);
    void deleteTeacher(Long id);





}
