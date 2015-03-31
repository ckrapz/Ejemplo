using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WebServiceCatalogos
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IService" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IServiceRest
    {

        //WEB SERVICE PARA ETAPAS

        [OperationContract]
        [WebGet(UriTemplate = "/GetCountEtapaPlaneacionPreinversion", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<PlaneacionPreinversion> GetPlaneacionPreinversion();


        [OperationContract]
        [WebGet(UriTemplate = "/GetCountEtapaInversion", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<Inversion> GetInversion();

        
        [OperationContract]
        [WebGet(UriTemplate = "/GetCountEtapaTerminado", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<Terminado> GetTerminado();


        [OperationContract]
        [WebGet(UriTemplate = "/GetMapa_EtapasProyectoFiltro/{etapa}", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<Mapa_EtapasProyectosFiltro> GetMapa_EtapasProyectosFiltro(string etapa);

        // SUBSECTORES

        [OperationContract]
        [WebGet(UriTemplate = "/GetCountNumSubsectorMasProy", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<NumSubsectorMasProy> Get_CountNumSubsectorMasProy();

        // COSTO TOTAL DE INVERSIÓN

        [OperationContract]
        [WebGet(UriTemplate = "/GetCostoTotalInversion", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<costoTotalInversion> Get_CostoTotalInversion();


        // NÚMERO CON MAS PROYECTOS

        [OperationContract]
        [WebGet(UriTemplate = "/GetEstadoNumConMasProy", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<estadoConMasProy> Get_EstadoNumConMasProy();


        //WEB SERVICE PARA FASES DEL PROYECTO

        [OperationContract]
        [WebGet(UriTemplate = "/GetFasesProyecto", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<catFasesProyecto> GetFasesProyecto();

        //WEB SERVICE PARA FASES DEL PROYECTO

        [OperationContract]
        [WebGet(UriTemplate = "/GetProgramaPresupuestario", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<catProgramaPresupuestario> GetProgramaPresupuestario();

        //WEB SERVICE - CATÁLOGO DE ETAPAS

        [OperationContract]
        [WebGet(UriTemplate = "/GetEtapas", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<catEtapas> GetEtapas();

        //WEB SERVICE PARA SUBSECTORES

        [OperationContract]
        [WebGet(UriTemplate = "/GetSubsectores", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<catSubsectores> GetSubsectores();

        //WEB SERVICE TIPOS PROYECTOS

        [OperationContract]
        [WebGet(UriTemplate = "/GetTiposProyecto/{cvSubsector}", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<catTiposProyecto> GetTiposProyecto(string cvsubsector);

        //WEB SERVICE DATOS DEL PROYECTO

        [OperationContract]
        [WebGet(UriTemplate = "/GetDatosProyecto/{cvProyecto}", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<datosDelProyecto> GetDatosProyecto(string cvProyecto);


        //WEB SERVICE - DATOS DEL PROYECTO - FINANCIAMIENTO E INVERSIONES

        [OperationContract]
        [WebGet(UriTemplate = "/GetFinanciamietoInversiones/{cvProyecto}", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<financiamientoeInversiones> GetFinanciamietoInversiones(string cvProyecto);
        
         //WEB SERVICE - DATOS DEL PROYECTO - DATOS PARA LA PRIORIZACIÓN

        [OperationContract]
        [WebGet(UriTemplate = "/GetDatosPriorizacion/{cvProyecto}", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<datosPriorizacion> GetDatosPriorizacion(string cvProyecto);

        //WEB SERVICE - CATÁLOGO DE ESTADOS

        [OperationContract]
        [WebGet(UriTemplate = "/GetEstados", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<cat_Estados> GetEstados();

        //WEB SERVICE MUNICIPIOS
        [OperationContract]
        [WebGet(UriTemplate = "/GetMunicipios/{cvmunicipio}", RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json
        )]
        List<cat_Municipios> GetMunicipios(string cvmunicipio);
    }
    
    //ETAPAS
    [DataContract]
    public class PlaneacionPreinversion
    {
        [DataMember]
        public string Count;
    }

    [DataContract]
    public class Inversion
    {
        [DataMember]
        public string Count;
    }

    [DataContract]
    public class Terminado
    {
        [DataMember]
        public string Count;
    }

   

    [DataContract]
    public class Mapa_EtapasProyectosFiltro
    {
        [DataMember]
        public string CvProyecto;
        [DataMember]
        public string Descripcion;
        [DataMember]
        public string Latitud;
        [DataMember]
        public string Longitud;
    }

    //SUBSECTORES
    [DataContract]
    public class NumSubsectorMasProy
    {
        [DataMember]
        public string Count;
        [DataMember]
        public string NombreSubsector;
    }

    //COSTO TOTAL DE INVERSIÓN
    [DataContract]
    public class costoTotalInversion
    {
        [DataMember]
        public string costoTotal;
    }

    //ESTADOS CON MAS PROYECTOS
    [DataContract]
    public class estadoConMasProy
    {
        [DataMember]
        public string Count;
        [DataMember]
        public string NombreEstado;
    }

    //ETAPAS DEL PROYECTO
    [DataContract]
    public class catEtapas
    {
        [DataMember]
        public string PK_Etapa;
        [DataMember]
        public string Descripcion;
    }

    //FASES DEL PROYECTO
    [DataContract]
    public class catFasesProyecto
    {
        [DataMember]
        public string PK_FaseProyecto;
        [DataMember]
        public string Descripcion;
    }


    //PROGRAMA PRESUPUESTARIO
    [DataContract]
    public class catProgramaPresupuestario
    {
        [DataMember]
        public string PK_ProgramaPresupuestario;
        [DataMember]
        public string Descripcion;
    }


    //SUBSECTORES
    [DataContract]
    public class catSubsectores
    {
        [DataMember]
        public string PK_SubSector;
        [DataMember]
        public string Descripcion;
    }


  


    //DATOS DEL PROYECTO
    [DataContract]
    public class datosDelProyecto
    {
        [DataMember]
        public string clave;
        [DataMember]
        public string proyectoIntegral;
        [DataMember]
        public string nombreProyecto;
        [DataMember]
        public string descripcionProyecto;
        [DataMember]
        public string riesgoEjecucionProyecto;
        [DataMember]
        public string subSector;
        [DataMember]
        public string etapa;
        [DataMember]
        public string fase;
        [DataMember]
        public string tipo;
        [DataMember]
        public string medida;
        [DataMember]
        public string rha;
        [DataMember]
        public string estado;
        [DataMember]
        public string celula;
        [DataMember]
        public string municipio;
        [DataMember]
        public string localidad;
        [DataMember]
        public string ramo;
        [DataMember]
        public string programaPresupuestario;
        [DataMember]
        public string finalidad;
        [DataMember]
        public string funcion;
    }

     //DATOS DEL PROYECTO - FINANCIAMIENTO E INVERSIONES
    [DataContract]
    public class financiamientoeInversiones
    {
        [DataMember]
        public string descripcion;
        [DataMember]
        public string importes;
        [DataMember]
        public string CvProyecto;
    }


    //DATOS DEL PROYECTO - DATOS PARA LA PRIORIZACIÓN
    [DataContract]
    public class datosPriorizacion
    {
        [DataMember]
        public string Meta;
        [DataMember]
        public string Beneficios;
        [DataMember]
        public string CI;
        [DataMember]
        public string CAU;
        [DataMember]
        public string CONA;
        [DataMember]
        public string CA;
        [DataMember]
        public string REP;
        [DataMember]
        public string SubNecesidad;
        [DataMember]
        public string Solucion;
        [DataMember]
        public string Descripcion;
        [DataMember]
        public string RFNVB;
        [DataMember]
        public string DVB;
        [DataMember]
        public string MBFE;
        [DataMember]
        public string ARVB;
        [DataMember]
        public string Fuente;
        [DataMember]
        public string CvProyecto;
    }
 
    //ESTADOS
    [DataContract]
    public class cat_Estados
    {
        [DataMember]
        public string PK_Estado;

        [DataMember]
        public string descripcion;
    }

    //MUNICIPIOS
    [DataContract]
    public class cat_Municipios
    {
        [DataMember]
        public string PK_Municipio;

        [DataMember]
        public string descripcion;
    }

    //TIPOS DE PROYECTO
    [DataContract]
    public class catTiposProyecto
    {
        [DataMember]
        public string PK_TipoProyecto;
        [DataMember]
        public string Descripcion;
    }
}
