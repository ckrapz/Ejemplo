using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WebServiceCatalogos
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Service" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Service.svc o Service.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Service : IServiceRest
    {
        public string cadena = ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
        SqlConnection SqlConn;

        //Etapa de planeación/preinversión
        public List<PlaneacionPreinversion> GetPlaneacionPreinversion()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[countNumEtapas]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@opcion", 1);
                reader = sqlCmd.ExecuteReader();

                List<PlaneacionPreinversion> Lista = new List<PlaneacionPreinversion>();
                
                while (reader.Read())
                {
                    Lista.Add(new PlaneacionPreinversion { Count = reader["numeroPlaneacion_preinversion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //Etapa inversión
        public List<Inversion> GetInversion()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;
                SqlCommand sqlCmd = new SqlCommand("[dbo].[countNumEtapas]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@opcion", 2);
                reader = sqlCmd.ExecuteReader();

                List<Inversion> Lista = new List<Inversion>();

                while (reader.Read())
                {
                    Lista.Add(new Inversion { Count = reader["numeroInversion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }


        //Etapa inversión
        public List<Terminado> GetTerminado()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;
                SqlCommand sqlCmd = new SqlCommand("[dbo].[countNumEtapas]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@opcion", 3);
                reader = sqlCmd.ExecuteReader();

                List<Terminado> Lista = new List<Terminado>();

                while (reader.Read())
                {
                    Lista.Add(new Terminado { Count = reader["numeroTerminado"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

       

        //Etapa Etapas Proyectos Filtro
        public List<Mapa_EtapasProyectosFiltro> GetMapa_EtapasProyectosFiltro(string etapa)
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;
                SqlCommand sqlCmd = new SqlCommand("[dbo].[Mapa_EtapasProyectosFiltro]", SqlConn);
                
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@etapa", etapa);
                reader = sqlCmd.ExecuteReader();

                List<Mapa_EtapasProyectosFiltro> Lista = new List<Mapa_EtapasProyectosFiltro>();

                while (reader.Read())
                {
                    Lista.Add(new Mapa_EtapasProyectosFiltro { CvProyecto = reader["CveProyecto"].ToString(), Descripcion = reader["Descripcion"].ToString(), Latitud = reader["Latitud"].ToString(), Longitud = reader["Longitud"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //Subsector con mas proyectos en el país
        public List<NumSubsectorMasProy> Get_CountNumSubsectorMasProy()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[countNumSubsectorMasProy]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<NumSubsectorMasProy> Lista = new List<NumSubsectorMasProy>();

                while (reader.Read())
                {
                    Lista.Add(new NumSubsectorMasProy { Count = reader["Numero"].ToString(), NombreSubsector = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //Costo total de inversión
        public List<costoTotalInversion> Get_CostoTotalInversion()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[costoTotalInversion]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<costoTotalInversion> Lista = new List<costoTotalInversion>();

                while (reader.Read())
                {
                    Lista.Add(new costoTotalInversion { costoTotal = reader["CostoTotalInversionGral"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }


        //Estado con más proyectos
        public List<estadoConMasProy> Get_EstadoNumConMasProy()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[countNumEstadoConMasProy]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<estadoConMasProy> Lista = new List<estadoConMasProy>();

                while (reader.Read())
                {
                    Lista.Add(new estadoConMasProy { Count = reader["Numero"].ToString(), NombreEstado = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //FASES DEL PROYECTO
        public List<catFasesProyecto> GetFasesProyecto()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_FaseProyecto]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<catFasesProyecto> Lista = new List<catFasesProyecto>();

                while (reader.Read())
                {
                    Lista.Add(new catFasesProyecto { PK_FaseProyecto = reader["PK_FaseProyecto"].ToString(), Descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //PROGRAMA PRESUPUESTARIO
        public List<catProgramaPresupuestario> GetProgramaPresupuestario()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_ProgramaPresupuestario]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<catProgramaPresupuestario> Lista = new List<catProgramaPresupuestario>();

                while (reader.Read())
                {
                    Lista.Add(new catProgramaPresupuestario { PK_ProgramaPresupuestario = reader["PK_Programa_Presupuestario"].ToString(), Descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //SUBSECTORES
        public List<catSubsectores> GetSubsectores()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_SubSectores]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<catSubsectores> Lista = new List<catSubsectores>();

                while (reader.Read())
                {
                    Lista.Add(new catSubsectores { PK_SubSector = reader["PK_SubSector"].ToString(), Descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //TIPOS DE PROYECTO
        public List<catTiposProyecto> GetTiposProyecto(string cvsubsector)
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_TiposProyectos]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@pk_subsector", cvsubsector);
                reader = sqlCmd.ExecuteReader();

                List<catTiposProyecto> Lista = new List<catTiposProyecto>();

                while (reader.Read())
                {
                    Lista.Add(new catTiposProyecto { PK_TipoProyecto = reader["PK_TipoProyecto"].ToString(), Descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //DATOS DEL PROYECTO
        public List<datosDelProyecto> GetDatosProyecto(string cvProyecto)
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[Marker_DatosDeUnProyecto]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@cvProyecto", cvProyecto);
                reader = sqlCmd.ExecuteReader();

                List<datosDelProyecto> Lista = new List<datosDelProyecto>();

                while (reader.Read())
                {
                    Lista.Add(new datosDelProyecto {
                        clave = reader["CveProyecto"].ToString(),
                        proyectoIntegral  = reader["NomProyectoIntegral"].ToString(),
                        nombreProyecto = reader["NomProyecto"].ToString(),
                        descripcionProyecto = reader["DescProyecto"].ToString(),
                        riesgoEjecucionProyecto = reader["RiesgosEjecucionProyecto"].ToString(),
                        subSector = reader["Subsector"].ToString(),
                        etapa = reader["Etapa"].ToString(),
                        fase = reader["FaseProyecto"].ToString(),
                        tipo  = reader["TipoProyecto"].ToString(),
                        medida  = reader["Medida"].ToString(),
                        rha  = reader["RHA"].ToString(),
                        estado  = reader["Estado"].ToString(),
                        celula  = reader["UnidadPlaneacion"].ToString(),
                        municipio = reader["Municipio"].ToString(),
                        localidad = reader["Localidad"].ToString(),
                        ramo = reader["Ramo"].ToString(),
                        programaPresupuestario = reader["ModalidadProgramaPresupuestario"].ToString(),
                        finalidad = reader["Finalidad"].ToString(),
                        funcion = reader["Funcion"].ToString()
                    });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //DATOS DEL PROYECTO - FINANCIAMIENTO E INVERSIONES
        public List<financiamientoeInversiones> GetFinanciamietoInversiones(string cvProyecto)
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[Marker_FinanciamientoeInversiones]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@cvProyecto", cvProyecto);
                reader = sqlCmd.ExecuteReader();

                List<financiamientoeInversiones> Lista = new List<financiamientoeInversiones>();

                while (reader.Read())
                {
                    Lista.Add(new financiamientoeInversiones
                    {
                        descripcion = reader["Descripcion"].ToString(),
                        importes = reader["Importe"].ToString(),
                        CvProyecto = reader["CveProyecto"].ToString()
                    });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }


        //DATOS DEL PROYECTO - DATOS PARA LA PRIORIZACIÓN
        public List<datosPriorizacion> GetDatosPriorizacion(string cvProyecto)
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;

                SqlCommand sqlCmd = new SqlCommand("[dbo].[Marker_DatosPriorizacion]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@cvProyecto", cvProyecto);
                reader = sqlCmd.ExecuteReader();

                List<datosPriorizacion> Lista = new List<datosPriorizacion>();

                while (reader.Read())
                {
                    Lista.Add(new datosPriorizacion
                    {
                        Meta = reader["Meta"].ToString(),
                        Beneficios = reader["Beneficios"].ToString(),
                        CI = reader["CI"].ToString(),
                        CAU = reader["CAU"].ToString(),
                        CONA = reader["CONA"].ToString(),
                        CA = reader["CA"].ToString(),
                        REP = reader["REP"].ToString(),
                        SubNecesidad = reader["SubNecesidad"].ToString(),
                        Solucion = reader["Solucion"].ToString(),
                        Descripcion = reader["Descripcion"].ToString(),
                        RFNVB = reader["RFNVB"].ToString(),
                        DVB = reader["DVB"].ToString(),
                        MBFE = reader["MBFE"].ToString(),
                        ARVB = reader["ARVB"].ToString(),
                        Fuente = reader["Fuente"].ToString(),
                        CvProyecto = reader["CveProyecto"].ToString()
                    });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //Catálogo de estados
        public List<cat_Estados> GetEstados()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;
                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_Estados]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<cat_Estados> Lista = new List<cat_Estados>();

                while (reader.Read())
                {
                    Lista.Add(new cat_Estados { PK_Estado = reader["PK_Estado"].ToString(), descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //Catálogo de etapas
        public List<catEtapas> GetEtapas()
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;
                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_Etapas]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                reader = sqlCmd.ExecuteReader();

                List<catEtapas> Lista = new List<catEtapas>();

                while (reader.Read())
                {
                    Lista.Add(new catEtapas { PK_Etapa = reader["PK_Etapa"].ToString(), Descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }

        //Catálogo de municipios
        public List<cat_Municipios> GetMunicipios(string cvmunicipio)
        {
            try
            {
                SqlConn = new SqlConnection(cadena);
                SqlConn.Open();
                SqlDataReader reader = null;
                SqlCommand sqlCmd = new SqlCommand("[dbo].[catalogo_Municipios]", SqlConn);
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddWithValue("@pk_municipio", cvmunicipio);
                reader = sqlCmd.ExecuteReader();

                List<cat_Municipios> Lista = new List<cat_Municipios>();

                while (reader.Read())
                {
                    Lista.Add(new cat_Municipios { PK_Municipio = reader["PK_Municipio"].ToString(), descripcion = reader["Descripcion"].ToString() });
                }
                SqlConn.Close();
                return Lista;
            }
            catch (Exception ex)
            {
                //(ex.ToString);
                Debug.WriteLine("Error en sistema: " + ex.ToString());
                return null;
            }
        }
    }
}
