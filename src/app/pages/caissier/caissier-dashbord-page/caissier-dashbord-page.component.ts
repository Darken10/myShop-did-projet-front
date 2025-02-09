import {Component, inject, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts';
import {LoginService} from "../../../services/auth/login.service";
import {IUser} from "../../../../models/Interfaces";
import {StatistiqueService} from "../../../services/statistique/statistique.service";
import {getMondayOfCurrent} from "../../../../functions/functions";

@Component({
  selector: 'app-caissier-dashbord-page',
  standalone: true,
  imports: [],
  templateUrl: './caissier-dashbord-page.component.html',
  styleUrl: './caissier-dashbord-page.component.css'
})
export class CaissierDashbordPageComponent implements OnInit{

  loginService : LoginService = inject(LoginService)
  statistiqueService : StatistiqueService = inject(StatistiqueService)
  lastLundi : Date  = new Date()
  user : IUser | null | undefined
  CAParSemain:number[]  = []
  PaiementParSemain:number[]  = []

  ngOnInit(): void {
    this.lastLundi = getMondayOfCurrent()
    this.loginService.getUser().subscribe((user)=>{
      this.user = user
      if (this.user && this.lastLundi){
        this.statistiqueService.getChiffreAffaireParJourSemaine(this.user.id,this.lastLundi).subscribe((data)=>{

          this.CAParSemain = this.getArrayOfNumber(data)
          console.log(this.CAParSemain)
          if (this.user)
          this.statistiqueService.getMontantPaiementParJourSemaine(this.user?.id,this.lastLundi).subscribe((data)=>{
            this.PaiementParSemain = this.getArrayOfNumber(data)
            this.salesThisWeek(this.CAParSemain, this.PaiementParSemain)
          })
        })

      }
    })

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
