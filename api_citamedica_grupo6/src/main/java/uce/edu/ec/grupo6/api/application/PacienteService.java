package uce.edu.ec.grupo6.api.application;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import uce.edu.ec.grupo6.api.domain.Paciente;
import uce.edu.ec.grupo6.api.intrastructure.PacienteRepository;

@ApplicationScoped
public class PacienteService {

    @Inject
    private PacienteRepository pacienteRepository;

    // CREATE
    @Transactional
    public void guardar(Paciente paciente) {
        pacienteRepository.persist(paciente);
    }

    // READ
    public List<Paciente> listarTodos() {
        return pacienteRepository.listAll();
    }

    // UPDATE
    @Transactional
    public Paciente actualizar(Long id, Paciente paciente) {
        Paciente p = pacienteRepository.findById(id);

        if (p == null) {
            return null;
        }

        p.nombre = paciente.nombre;
        p.apellido = paciente.apellido;
        p.cedula = paciente.cedula;
        p.telefono = paciente.telefono;
        p.fechaNacimiento = paciente.fechaNacimiento;

        return p; // dirty checking
    }

    // DELETE
    @Transactional
    public boolean eliminar(Long id) {
        return pacienteRepository.deleteById(id);
    }
}
