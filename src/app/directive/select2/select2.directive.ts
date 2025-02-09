import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
declare var $: any;  // Pour accéder à jQuery

@Directive({
  selector: '[appSelect2]'
})
export class Select2Directive implements OnInit, OnDestroy {
  // Vous pouvez passer des options à Select2 via un Input
  @Input() options: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // Initialiser Select2 sur l’élément avec les options fournies
    $(this.el.nativeElement).select2(this.options);
  }

  ngOnDestroy(): void {
    // Détruire Select2 pour libérer les ressources et éviter les fuites mémoire
    $(this.el.nativeElement).select2('destroy');
  }
}
