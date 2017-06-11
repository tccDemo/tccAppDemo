
1. web.xml

```
<servlet>
    <servlet-name>jersey</servlet-name>
    <servlet-class>org.glassfish.jersey.servlet.ServletContainer</servlet-class>
    <init-param>
      <param-name>jersey.config.server.provider.packages</param-name>
      <param-value>WebMan.restapi</param-value>
    </init-param>
    <init-param>
      <param-name>javax.ws.rs.Application</param-name>
      <param-value>WebMan.restapi.config.RestResourceConfig</param-value>
    </init-param>
    <init-param>
      <param-name>jersey.config.server.provider.classnames</param-name>
      <param-value>org.glassfish.jersey.media.multipart.MultiPartFeature</param-value>
    </init-param>
    <init-param>
      <param-name>com.sun.jersey.spi.container.ContainerRequestFilters</param-name>
      <param-value>WebMan.restapi.filter.AuthorizationRequestFilter</param-value>
    </init-param>
    <init-param>
      <param-name>jersey.config.server.wadl.disableWadl</param-name>
      <param-value>true</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>jersey</servlet-name>
    <url-pattern>/cc/tcc.tracker/*</url-pattern>
  </servlet-mapping>
  <filter>
    <filter-name>ApiOriginFilter</filter-name>
    <filter-class>WebMan.restapi.ApiOriginFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>ApiOriginFilter</filter-name>
    <url-pattern>/cc/tcc.tracker/*</url-pattern>
  </filter-mapping>

```
  2. download jars from POM.xml 

  3. build.gradle 
```
    dependencies {
    compile group: 'io.swagger', name: 'swagger-jersey2-jaxrs', version:'1.5.12'
    compile group: 'ch.qos.logback', name: 'logback-classic', version:'1.1.7'
    compile group: 'ch.qos.logback', name: 'logback-core', version:'1.1.7'
    compile group: 'javax.servlet', name: 'servlet-api', version:'2.5'
    compile group: 'org.glassfish.jersey.containers', name: 'jersey-container-servlet-core', version:'2.25.1'
    compile group: 'org.glassfish.jersey.media', name: 'jersey-media-multipart', version:'2.25.1'
    compile group: 'com.fasterxml.jackson.datatype', name: 'jackson-datatype-joda', version:'2.8.7'
    compile group: 'com.fasterxml.jackson.jaxrs', name: 'jackson-jaxrs-json-provider', version:'2.8.7'
    compile group: 'com.brsanthu', name: 'migbase64', version:'2.2'
    compile group: 'org.glassfish.jersey.ext', name: 'jersey-bean-validation', version:'2.25.1'
    compile group: 'javax.validation', name: 'validation-api', version:'1.1.0.Final'

```