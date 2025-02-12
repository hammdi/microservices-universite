package tn.esprit.mehdibenattaya4twin9.configuration;


import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Aspect
@Component
@Slf4j
public class ConfigAOP {


  //  @AfterThrowing("execution(* tn.esprit.mehdibenattaya4twin9.service.*.ajouter*(..))") //apres execution avec declenchement d'exception
   // @AfterReturning("execution(* tn.esprit.mehdibenattaya4twin9.service.*.ajouter*(..))") //apres la bonne execution
  //  @Before("execution(* tn.esprit.mehdibenattaya4twin9.service.*.ajouter*(..))") //avant execution
    //methode qui commence par add et ajouter
@After("execution(* tn.esprit.mehdibenattaya4twin9.service.*.ajouter*(..))") //apres l'execution meme si faux
void aspectMethod(JoinPoint joinPoint)
{log.info("In method"+joinPoint.getSignature().getName());}





/*
    @Around("execution(* tn.esprit.mehdibenattaya4twin9.service.*.ajouter*(..))") //calculer le temps d'execution
    Object calculerPerformance(ProceedingJoinPoint pjp) throws Throwable
    {
        LocalDateTime debut= LocalDateTime.now();
        Object obj= pjp.proceed();
        LocalDateTime fin = LocalDateTime.now();

        long duree= Duration.between(debut,fin).toMillis();
        log.info("le temps d'execution est:"+ duree + "ms");
        return obj;
    }
*/







}


// After("execution(* tn.esprit.mehdibenattaya4twin9.service.*.*(..))")
/*
//viser les differentes methodes de la couche service derniere etoile
est nimporte quel nom de methode et l'avant et n'importe quel classe
de la couche service et premiere etoile et le type de retour
*/








