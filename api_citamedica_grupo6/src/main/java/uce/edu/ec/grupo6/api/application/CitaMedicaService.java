package uce.edu.ec.grupo6.api.application;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import uce.edu.ec.grupo6.api.intrastructure.CitaMedicaRepository;

@ApplicationScoped
public class CitaMedicaService {
    @Inject
    private CitaMedicaRepository citaMedicaRepository;
}
