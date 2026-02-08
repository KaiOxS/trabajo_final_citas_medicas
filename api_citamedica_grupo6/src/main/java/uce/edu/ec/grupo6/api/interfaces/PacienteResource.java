package uce.edu.ec.grupo6.api.interfaces;

import java.util.List;

import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import uce.edu.ec.grupo6.api.application.PacienteService;
import uce.edu.ec.grupo6.api.domain.Paciente;

@Path("/pacientes")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PacienteResource {

    @Inject
    private PacienteService pacienteService;

    // CREATE
    @POST
    @RolesAllowed("ADMIN")
    public Response crearPaciente(@Valid Paciente paciente) {
        pacienteService.guardar(paciente);
        return Response.status(Response.Status.CREATED).entity(paciente).build();
    }

    // READ
    @GET
    @RolesAllowed("ADMIN")
    public List<Paciente> listarPacientes() {
        return pacienteService.listarTodos();
    }

    // UPDATE
    @PUT
    @Path("/{id}")
    @RolesAllowed("ADMIN")
    public Response actualizarPaciente(
            @PathParam("id") Long id,
            @Valid Paciente paciente) {

        Paciente actualizado = pacienteService.actualizar(id, paciente);

        if (actualizado == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(actualizado).build();
    }

    // DELETE
    @DELETE
    @Path("/{id}")
    @RolesAllowed("ADMIN")
    public Response eliminarPaciente(@PathParam("id") Long id) {
        boolean eliminado = pacienteService.eliminar(id);

        if (!eliminado) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
    }
}
