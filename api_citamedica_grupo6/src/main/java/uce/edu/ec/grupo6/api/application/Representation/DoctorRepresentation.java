package uce.edu.ec.grupo6.api.application.Representation;

import uce.edu.ec.grupo6.api.domain.Doctor.EstadoDoctor;

public class DoctorRepresentation {
    public Long id;
    public String nombre;
    public String apellido;
    public String nro_licencia;
    public EstadoDoctor estado;
    public String especialidad;
    public DoctorRepresentation() {
    }
    public DoctorRepresentation(Long id, String nombre, String apellido, String nro_licencia, EstadoDoctor estado,
            String especialidad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nro_licencia = nro_licencia;
        this.estado = estado;
        this.especialidad = especialidad;
    }

    
}
