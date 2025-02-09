import {Component, inject, OnInit} from '@angular/core';
import {ProduitCategoriesTags, StockStatut} from "../../../../models/Types";
import {StatistiqueService} from "../../../services/statistique/statistique.service";
import {LoginService} from "../../../services/auth/login.service";
import {IUser} from "../../../../models/Interfaces";
import {getMondayOfCurrent} from "../../../../functions/functions";
import ApexCharts from "apexcharts";

@Component({
  selector: 'app-gestionnaire-dashbord-page',
  standalone: true,
  imports: [],
  templateUrl: './gestionnaire-dashbord-page.component.html',
  styleUrl: './gestionnaire-dashbord-page.component.css'
})
export class GestionnaireDashbordPageComponent implements OnInit{

  produitCategoriesTags :ProduitCategoriesTags |undefined
  stockStatut :StockStatut |undefined
  private statistiqueService : StatistiqueService = inject(StatistiqueService)

  lastLundi : Date  = new Date()
  user : IUser | null | undefined
  CAParSemain:number[]  = []
  PaiementParSemain:number[]  = []

  ngOnInit(): void {
    console.log("dash")
    this.statistiqueService.getProduitCategoriesTags().subscribe(count=>{
      this.produitCategoriesTags = count
    })
    this.statistiqueService.getStockStatut().subscribe(count=>{
      this.stockStatut = count
    })

    this.lastLundi = getMondayOfCurrent()
    if (this.lastLundi){
      this.statistiqueService.getChiffreAffaireParJourSemainePourTous(this.lastLundi).subscribe((data)=>{

        this.CAParSemain = this.getArrayOfNumber(data)
        console.log(this.CAParSemain)
        this.statistiqueService.getMontantPaiementParJourSemainePourTous(this.lastLundi).subscribe((data)=>{
          console.log(data)
          this.PaiementParSemain = this.getArrayOfNumber(data)
          console.log(this.PaiementParSemain)
          this.salesThisWeek(this.CAParSemain, this.PaiementParSemain)
        })
      })

    }

  }



  private getArrayOfNumber(data:any){
    let  PaiementParSemain:number[] = []
    PaiementParSemain[0] = data?.lundi ?? 0
    PaiementParSemain[1] = data?.mardi ?? 0
    PaiementParSemain[2] = data?.mercredi ?? 0
    PaiementParSemain[3] = data?.jeudi ?? 0
    PaiementParSemain[4] = data?.vendredi ?? 0
    PaiementParSemain[5] = data?.samedi ?? 0
    PaiementParSemain[6] = data?.dimanche ?? 0
    return PaiementParSemain
  }


  salesThisWeek(CAParSemain: number[],PaiementParSemain:number[]){
    if (document.getElementById('main-chart')) {
      const chart = new ApexCharts(document.getElementById('main-chart'), this.getMainChartOptions(CAParSemain,PaiementParSemain));
      chart.render();

      // init again when toggling dark mode
      document.addEventListener('dark-mode', () => {
        chart.updateOptions(this.getMainChartOptions(CAParSemain,PaiementParSemain));
      });
    }

  }



  getMainChartOptions = (CAParSemain:number[],PaiementParSemain:number[]) => {
    let mainChartColors: { borderColor: string; labelColor: string; opacityFrom: number; opacityTo: number }

    console.log(CAParSemain,PaiementParSemain)
    if (document.documentElement.classList.contains('dark')) {
      mainChartColors = {
        borderColor: '#374151',
        labelColor: '#9CA3AF',
        opacityFrom: 0,
        opacityTo: 0.15,
      };
    } else {
      mainChartColors = {
        borderColor: '#F3F4F6',
        labelColor: '#6B7280',
        opacityFrom: 0.45,
        opacityTo: 0,
      }
    }

    return {
      chart: {
        height: 420,
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        foreColor: mainChartColors.labelColor,
        toolbar: {
          show: false
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          enabled: true,
          opacityFrom: mainChartColors.opacityFrom,
          opacityTo: mainChartColors.opacityTo
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      grid: {
        show: true,
        borderColor: mainChartColors.borderColor,
        strokeDashArray: 1,
        padding: {
          left: 35,
          bottom: 15
        }
      },
      series: [
        {
          name: 'Vente',
          data:  CAParSemain,
          color: '#1A56DB'
        },
        {
          name: 'Paiement',
          data: PaiementParSemain,
          color: '#FDBA8C'
        }
      ],
      markers: {
        size: 5,
        strokeColors: '#ffffff',
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },
      xaxis: {
        categories: [
          (this.lastLundi?.getDate()).toString().padStart(2,'0')+ ' Fev',
          (this.lastLundi?.getDate()+1).toString().padStart(2,'0')+ ' Fev',
          (this.lastLundi?.getDate()+2).toString().padStart(2,'0')+ ' Fev',
          (this.lastLundi?.getDate()+3).toString().padStart(2,'0')+ ' Fev',
          (this.lastLundi?.getDate()+4).toString().padStart(2,'0')+ ' Fev',
          (this.lastLundi?.getDate()+5).toString().padStart(2,'0')+ ' Fev',
          (this.lastLundi?.getDate()+6).toString().padStart(2,'0')+ ' Fev'
        ],
        labels: {
          style: {
            colors: [mainChartColors.labelColor],
            fontSize: '14px',
            fontWeight: 500,
          },
        },
        axisBorder: {
          color: mainChartColors.borderColor,
        },
        axisTicks: {
          color: mainChartColors.borderColor,
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: mainChartColors.borderColor,
            width: 1,
            dashArray: 10,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [mainChartColors.labelColor],
            fontSize: '14px',
            fontWeight: 500,
          },
          formatter: function (value: string) {
            return  value + 'XOF';
          }
        },
      },
      legend: {
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
        labels: {
          colors: [mainChartColors.labelColor]
        },
        itemMargin: {
          horizontal: 10
        }
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            xaxis: {
              labels: {
                show: false
              }
            }
          }
        }
      ]
    };
  }


  get totalVente():number{
    let somme = 0
    this.CAParSemain.forEach(a=>{
      somme = somme+a
    })
    return somme
  }


}
