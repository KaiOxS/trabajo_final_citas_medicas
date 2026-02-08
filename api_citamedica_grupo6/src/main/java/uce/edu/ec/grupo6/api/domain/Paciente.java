package uce.edu.ec.grupo6.api.domain;

import java.time.LocalDate;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "paciente")
@SequenceGenerator(
    name = "paciente_seq",
    sequenceName = "paciente_secuencia",
    allocationSize = 1
)
public class Paciente extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "paciente_seq")
    public Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(length = 100, nullable = false)
    public String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Column(length = 100, nullable = false)
    public String apellido;

    @NotBlank(message = "La cédula es obligatoria")
    @Size(min = 10, max = 10, message = "La cédula debe tener 10 dígitos")
    @Column(length = 10, unique = true, nullable = false)
    public String cedula;

    @Column(length = 20)
    public String telefono;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Column(name = "fecha_nacimiento", nullable = false)
    public LocalDate fechaNacimiento;
}
