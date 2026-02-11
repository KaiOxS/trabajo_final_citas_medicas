package uce.edu.ec.grupo6.api.application;

import java.util.ArrayList;
import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import uce.edu.ec.grupo6.api.application.Representation.DoctorRepresentation;
import uce.edu.ec.grupo6.api.domain.Doctor;
import uce.edu.ec.grupo6.api.intrastructure.DoctorRepository;

@ApplicationScoped
public class DoctorService {
    @Inject
    private DoctorRepository doctorRepository;

    @Transactional
    public void guardar(DoctorRepresentation doctorRepre) {
        this.doctorRepository.persist(this.mapperToDoctor(doctorRepre));
    }

    public List<DoctorRepresentation> listarTodos() {
        List<DoctorRepresentation> listaRepre = new ArrayList<>();
        for (Doctor doc : this.doctorRepository.listAll()) {
            listaRepre.add(this.mapperToDR(doc));
        }
        return listaRepre;
    }

    public DoctorRepresentation consultarPorId(Long id) {
        Doctor doc = this.doctorRepository.findById(id);
        return (doc != null) ? this.mapperToDR(doc) : null;
    }

    @Transactional
    public DoctorRepresentation actualizar(Long id, DoctorRepresentation doctorRepre) {
        // buscar la entidad original directamente
        Doctor doc = this.doctorRepository.findById(id);

        if (doc == null) {
            return null;
        }

        // actualizar el estado de la entidad gestionada por Hibernate
        doc.nombre = doctorRepre.nombre;
        doc.apellido = doctorRepre.apellido;
        doc.nro_licencia = doctorRepre.nro_licencia;
        doc.estado = doctorRepre.estado;
        doc.especialidad = doctorRepre.especialidad;

        return this.mapperToDR(doc);
    }

    @Transactional
    public boolean eliminar(Long id) {
        return this.doctorRepository.deleteById(id);
    }

    private DoctorRepresentation mapperToDR(Doctor doctor) {
        DoctorRepresentation docRepre = new DoctorRepresentation();
        docRepre.id = doctor.id;
        docRepre.nombre = doctor.nombre;
        docRepre.apellido = doctor.apellido;
        docRepre.nro_licencia = doctor.nro_licencia;
        docRepre.estado = doctor.estado;
        docRepre.especialidad = doctor.especialidad;
        return docRepre;
    }

    private Doctor mapperToDoctor(DoctorRepresentation docRepre) {
        Doctor doctor = new Doctor();

        doctor.nombre = docRepre.nombre;
        doctor.apellido = docRepre.apellido;
        doctor.nro_licencia = docRepre.nro_licencia;
        doctor.estado = doctor.estado;
        doctor.especialidad = docRepre.especialidad;
        return doctor;
    }
}
