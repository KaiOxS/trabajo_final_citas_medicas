package uce.edu.ec.grupo6.api.domain;

import java.time.LocalDate;
import java.time.LocalTime;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="cita_medica")
@SequenceGenerator(name="cita_seq", sequenceName = "cita_secuencia", allocationSize = 1)
public class CitaMedica extends PanacheEntityBase{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cita_seq")
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name="doctor_id_fk", nullable = false)
    public Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name="paciente_id_fk", nullable = false)
    public Paciente paciente;

    @Column(nullable = false)
    public LocalDate fechaCita;

    @Column(nullable = false)
    public LocalTime horaCita;

    @Column(length = 500)
    public String motivo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_cita")
    public EstadoCita estadoCita;

    public enum EstadoCita {
    PROGRAMADA, CANCELADA, COMPLETADA
}
}
