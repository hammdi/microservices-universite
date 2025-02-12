package tn.esprit.mehdibenattaya4twin9.service;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tn.esprit.mehdibenattaya4twin9.entity.Teacher;
import tn.esprit.mehdibenattaya4twin9.entity.UserTest;
import tn.esprit.mehdibenattaya4twin9.repository.TeacherRepo;
import tn.esprit.mehdibenattaya4twin9.repository.UserTestRepo;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ServiceImpl implements IService{




    private final TeacherRepo teacherRepository;

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));
    }

    @Override
    public Teacher addTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher updateTeacher(Long id, Teacher updatedTeacher) {
        Teacher teacher = getTeacherById(id);
        teacher.setFirstName(updatedTeacher.getFirstName());
        teacher.setLastName(updatedTeacher.getLastName());
        teacher.setEmail(updatedTeacher.getEmail());
        teacher.setPhone(updatedTeacher.getPhone());
        teacher.setSpecialty(updatedTeacher.getSpecialty());
        return teacherRepository.save(teacher);
    }

    @Override
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }














}
